from django.urls import path

from . import views


urlpatterns = [
    path("", views.apiOverview, name="api-overview"),
    path("list/", views.taskList, name="list"),
    path("detail/<str:pk>/", views.taskDetail, name="detail"),
    path("create/", views.taskCreate, name="create"),
    path("update/<str:pk>/", views.taskUpdate, name="update"),
    path("delete/<str:pk>/", views.taskDelete, name="delete"),
]

