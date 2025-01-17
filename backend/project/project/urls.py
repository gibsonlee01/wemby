"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

from wemby_app.views import register_user
from wemby_app.views import get_all_users
from wemby_app.views import kakaopay_ready
from wemby_app.views import kakaopay_approve
from wemby_app.views import likes
from wemby_app.views import kakaopay_register_ready


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', register_user),
    path('api/list', get_all_users),
    path('api/likes', likes),
    path('api/kakaopay/ready', kakaopay_ready),
    path('api/kakaopay/approve', kakaopay_approve),
    path('api/kakaopay/register/ready', kakaopay_register_ready),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
