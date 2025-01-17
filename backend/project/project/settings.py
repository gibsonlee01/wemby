"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
import logging

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-z)bdq@8cc&(yf!8m#9h28j*vw2=9(r*ww=hg$5!iexz&^n9&0$'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost',os.environ.get('DB_HOST'),'127.0.0.1', 'wemby.site:84']

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

CSRF_TRUSTED_ORIGIN = ['http://localhost:84', f'http://{os.environ.get("DB_HOST")}:84', 'http://wemby.site:84',  'http://127.0.0.1:84']

# Application definition

INSTALLED_APPS = [
    'wemby_app',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        #'ENGINE': 'django.contrib.gis.db.backends.mysql', -> gis의 g가 지도의 g다 지리적 머시기 할때 쓰세용
        'NAME': os.environ.get('DB_NAME'), # DB명
        'USER': os.environ.get('DB_USER'), # 데이터베이스 계정
        'PASSWORD': os.environ.get('DB_PW'),
        'HOST': os.environ.get('DB_HOST'), #use database external ip when db ip bind public
        # 'HOST': 'host.docker.internal', #use database external ip when db ip bind public
        'PORT': 3306, # 데이터베이스 포트(보통은 3306)
        'CONN_MAX_AGE': 60,
        'CONN_HEALTH_CHECKS': True,
        # 'OPTIONS': {
            # 'init_command' : "SET sql_mode='STRICT_TRANS_TABLES'",
            # 'connect_timeout': 60,
        # }
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

HTTP_URL = 'localhost:84'
STATIC_URL = 'static/'


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
        #'rest_framework.permissions.IsAuthenticated', # 있으면 "detail": "자격 인증데이터(authentication credentials)가 제공되지 않았습니다." 뜸
    ]
}

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': { 
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#             'formatter': 'verbose',
#         },
#         'file': {
#             'level': 'INFO',
#             'class': 'logging.FileHandler',
#             'filename': '../../logger.log',  # 로그 파일 경로 및 이름
#             'formatter': 'verbose',
#         },
#     },
#     'formatters': {
#         'verbose': {
#             'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#         },
#     },
#     'root': {
#         'handlers': ['file'],
#         'level': 'INFO',
#     },
# }

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'wemby': {
            'handlers': ['console'],
            'level': 'DEBUG',
        }
    }
}


# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',
#     # 추가적인 도메인이 있다면 여기에 등록
# ]

CORS_ORIGIN_ALLOW_ALL = True
KAKAO_API_KEY = os.getenv("KAKAO_API_KEY") 