from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('polls/', include('app.polls.urls'), name="polls"),
    path('admin/', admin.site.urls),
]