from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get_table', views.get_table, name="get_table"),
    path('<int:table_pk>', views.content, name="content"),
    path('', views.home, name="home"),
]
