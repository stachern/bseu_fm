# coding: utf8
import Tkinter
from ttk import Frame, Label, Button
import shutil
import settings
import urllib2
import zipfile
import logging as lg
import os
from ftpsync.targets import FsTarget, UploadSynchronizer
from ftpsync.ftp_target import FtpTarget
import pprint
from threading import Thread
from wok.engine import Engine


class WidgetLogger(lg.Handler):

    def __init__(self, widget):
        lg.Handler.__init__(self)
        self.widget = widget

    def emit(self, record):
        # Append message (record) to the widget
        self.widget.insert(Tkinter.INSERT, str(record.msg) + '\n')


class GUI(Frame):
    def __init__(self, master=None, **kw):
        Frame.__init__(self, master, **kw)
        self.initialize()

    def initialize(self):
        self.master.title(settings.APP_TITLE)

        self.pack(fill=Tkinter.BOTH, expand=1)

        self.columnconfigure(1, weight=1)
        self.columnconfigure(3, pad=7)
        self.rowconfigure(3, weight=1)
        self.rowconfigure(5, pad=7)

        lbl = Label(self, text="Журнал")
        lbl.grid(sticky=Tkinter.W, pady=4, padx=5)

        self.area = Tkinter.Text(self)
        self.area.grid(row=1, column=0, columnspan=2, rowspan=4,
                       padx=5, sticky=Tkinter.E + Tkinter.W + Tkinter.S + Tkinter.N)

        self.widgetLogger = WidgetLogger(self.area)

        lbl = Label(self, text="Адрес репозитория: ")
        lbl.grid(row=6)

        self.repo_addr_str = Tkinter.StringVar()
        self.repo_addr = Tkinter.Entry(self, textvariable=self.repo_addr_str)
        self.repo_addr.grid(row=7)

        lbl = Label(self, text="FTP для размещения: ")
        lbl.grid(row=6, column=1)

        self.ftp_addr_str = Tkinter.StringVar()
        self.ftp_addr = Tkinter.Entry(self, textvariable=self.ftp_addr_str)
        self.ftp_addr.grid(row=7, column=1, pady=1)

        self.deploybtn = Button(self, text="Начать обновление", command=self.start_update_thread)
        self.deploybtn.grid(row=10)

    def start_update_thread(self):
        # resetting vars
        settings.DEFAULT_FTP_HOST = self.ftp_addr_str.get()
        settings.DEFAULT_GIT_REPO = self.repo_addr_str.get()

        self.deploybtn.config(text="Идет обновление...", state=Tkinter.DISABLED)

        tr = Thread(target=lambda: full_cycle(self))
        tr.start()


def download_chunks(src, tmp_file):
    # simple chunked download

    try:
        logging.info(src.info())
        total_size = int(src.info().getheader('Content-Length').strip())
        downloaded = 0
        CHUNK = 128 * 10240
        with open(tmp_file, 'wb') as fp:
            while True:
                chunk = src.read(CHUNK)
                downloaded += len(chunk)
                logging.info('downloaded %s of %s' % (downloaded, total_size))
                if not chunk:
                    break
                fp.write(chunk)
    except urllib2.HTTPError, e:
        logging.error("HTTP Error: %s" % e.code)
        raise
    except urllib2.URLError, e:
        logging.error("URL Error: %s" % e.reason)
        raise

    return tmp_file


def download_file(url, target_dir, tmp_file_name):

    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    src = urllib2.urlopen(url)

    tmp_file = os.path.join(target_dir, tmp_file_name)

    return download_chunks(src, tmp_file)


def extract_all_files(zip_file, extract_dir):
    zip = zipfile.ZipFile(zip_file)
    logging.info('Extracting: %s' % pprint.pformat(zip.namelist()))
    zip.extractall(extract_dir)
    zip.close()


def build_site(site_dir):
    logging.info('Building site from source..')
    Engine.SITE_ROOT = site_dir
    Engine()


def copy_to_ftp(source_folder, dest_host):
    logging.info('Copying %s to %s' % (source_folder, dest_host))
    local = FsTarget(source_folder)
    remote = FtpTarget(settings.DEFAULT_FTP_PATH, dest_host, settings.DEFAULT_FTP_USER, settings.DEFAULT_FTP_PASS)
    s = UploadSynchronizer(local, remote, settings.DEFAULT_FTP_SYNC_OPTS)
    s.run()


def cleanup_tmp_files(tmp_dir):
    logging.info('Removing temp files..')
    if os.path.isdir(tmp_dir):
        shutil.rmtree(tmp_dir)
    elif os.path.exists(tmp_dir):
        os.remove(tmp_dir)


def full_cycle(app):
    try:
        zfile = download_file(settings.DEFAULT_GIT_REPO, settings.DEFAULT_TMP_DIR, 'master.zip')
        extract_all_files(zfile, settings.DEFAULT_TMP_DIR)
        build_site(settings.DEFAULT_SITE_DIR)
        copy_to_ftp(settings.DEFAULT_BUILT_SITE_DIR, settings.DEFAULT_FTP_HOST)
    except Exception, e:
        logging.error('Error: %s' % e)
        app.deploybtn.config(text="Ошибка. Повторить.", state=Tkinter.NORMAL)
    else:
        app.deploybtn.config(text="Обновлено успешно", state=Tkinter.DISABLED)
    finally:
        cleanup_tmp_files(settings.DEFAULT_TMP_DIR)


if __name__ == "__main__":
    root = Tkinter.Tk()
    root.geometry("350x300+300+300")
    app = GUI(root)

    # some voodoo to display log in a widget
    logging = lg.getLogger('update')
    logging.setLevel(lg.INFO)
    logging.addHandler(app.widgetLogger)

    app.repo_addr_str.set(settings.DEFAULT_GIT_REPO)
    app.ftp_addr_str.set(settings.DEFAULT_FTP_HOST)

    root.mainloop()
