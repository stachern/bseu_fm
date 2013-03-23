# coding: utf8
import Tkinter
from ttk import Frame, Label, Style, Button
import shutil
import settings
import urllib2
import zipfile
import logging
import os
import ftptool
from wok.engine import Engine


class GUI(Frame):
    def __init__(self, master=None, **kw):
        Frame.__init__(self, master, **kw)
        self.initialize()

    def initialize(self):
        self.master.title(settings.APP_TITLE)
        self.style = Style()
        self.style.theme_use("default")
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

        self.deploybtn = Button(self, text="Начать обновление", command=full_cycle)
        self.deploybtn.grid(row=5)


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
    logging.info('Extracting: %s' % zip.namelist())
    zip.extractall(extract_dir)
    zip.close()


def build_site(site_dir):
    logging.info('Building site from source..')
    Engine.SITE_ROOT = site_dir
    Engine()


def copy_to_ftp(source_folder, dest_host):
    logging.info('Copying %s to %s' % (source_folder, dest_host))
    ftp = ftptool.FTPHost.connect(dest_host)
    ftp.mirror_to_remote(source_folder, 'upload/site')


def cleanup_tmp_files(tmp_dir):
    logging.info('Removing temp files..')
    if os.path.isdir(tmp_dir):
        shutil.rmtree(tmp_dir)
    elif os.path.exists(tmp_dir):
        os.remove(tmp_dir)


def full_cycle():
    try:
        zfile = download_file(settings.DEFAULT_GIT_REPO, settings.DEFAULT_TMP_DIR, 'master.zip')
        extract_all_files(zfile, settings.DEFAULT_TMP_DIR)
        build_site(settings.DEFAULT_SITE_DIR)
        copy_to_ftp(settings.DEFAULT_BUILT_SITE_DIR, settings.DEFAULT_FTP_HOST)
    except Exception, e:
        logging.error('Error: %s' % e)
    finally:
        cleanup_tmp_files(settings.DEFAULT_TMP_DIR)


if __name__ == "__main__":
    root = Tkinter.Tk()
    root.geometry("350x300+300+300")
    app = GUI(root)
    app.area.setvar('text', 'asdasd')
    root.mainloop()
