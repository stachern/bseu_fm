import os

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

DEFAULT_GIT_REPO = 'https://github.com/stachern/bseu_fm/archive/master.zip'
DEFAULT_FTP_HOST = '192.168.1.110'

DEFAULT_TMP_DIR = os.path.join(PROJECT_ROOT, 'tmp')
DEFAULT_SITE_DIR = os.path.join(DEFAULT_TMP_DIR, 'bseu_fm-master')
DEFAULT_BUILT_SITE_DIR = os.path.join(DEFAULT_SITE_DIR, 'site')

LOGGING_FORMAT_SIMPLE = '%(message)s'
LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

LOGGING_FILE = os.path.join(PROJECT_ROOT, 'logs', 'deploy.log')


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
        'handlers': ['file', 'console'],
    }

}

import logging.config

logging.config.dictConfig(LOGGING_CONFIG)