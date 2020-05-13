from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    url("users/", include("app.user.urls"), name="user"),
    path("task/", include("app.task.urls")),
    path("admin/", admin.site.urls),
]
