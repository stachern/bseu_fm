# coding: utf8
from datetime import datetime

import tempfile
import os

APP_TITLE = 'Обновление сайта'

PROJECT_ROOT = tempfile.gettempdir()

DEFAULT_GIT_REPO = 'https://github.com/stachern/bseu_fm/archive/master.zip'
DEFAULT_FTP_HOST = '127.0.0.1'
DEFAULT_FTP_USER = 'anonymous'
DEFAULT_FTP_PASS = 'fake@domail.com'
DEFAULT_FTP_PATH = '/'
DEFAULT_FTP_SYNC_OPTS = {"force": True, "delete_unmatched": False, "verbose": 5, "dry_run": False}

DEFAULT_TMP_DIR = os.path.join(PROJECT_ROOT, 'fm-build')
DEFAULT_SITE_DIR = os.path.join(DEFAULT_TMP_DIR, 'bseu_fm-master')
DEFAULT_BUILT_SITE_DIR = os.path.join(DEFAULT_SITE_DIR, 'site')

LOGGING_FORMAT_SIMPLE = '%(message)s'
LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

LOGGING_FILE = os.path.join(PROJECT_ROOT, 'fm-build-logs', '%s.log' % datetime.now().strftime('%Y-%m-%d_%H-%M'))


if not os.path.exists(os.path.dirname(LOGGING_FILE)):
    os.makedirs(os.path.dirname(LOGGING_FILE))


LOGGING_CONFIG = {
    'version': 1,
    'formatters': {
        'verbose': {
            'format': LOGGING_FORMAT,
            },
        'simple': {
            'format': LOGGING_FORMAT_SIMPLE,
            }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',
            'formatter': 'simple',
            },

        'file': {
            'class': 'logging.FileHandler',
            'level': 'DEBUG',
            'formatter': 'verbose',
            'filename': LOGGING_FILE
        }
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['file'],
    }

}

import logging.config

logging.config.dictConfig(LOGGING_CONFIG)
