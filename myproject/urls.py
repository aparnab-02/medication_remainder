"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from myapp import views
# from myapp.views import user_logout
from myapp.views import submit_form
from myapp.views import register, user_login
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', register, name='register'),  # Route root URL to register view
    path('index/', views.index, name='index'),
    path('submit_form/', submit_form, name='submit_form'),
    path('waiting_page/', views.waiting_page, name='waiting'),
    # path('user_logout/', user_logout, name='user_logout'),
    path('login/', user_login, name='login'),
]
