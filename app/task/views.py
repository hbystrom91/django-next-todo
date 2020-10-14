from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions


from .serializers import TaskSerializer

from .models import Task


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def apiOverview(request):
    api_urls = {
        "List": "/list/",
        "Detail view": "/detail/<str:pk>/",
        "Create": "/create/",
        "Update": "/update/<str:pk>/",
        "Delete": "/delete/<str:pk>/",
    }

    return Response(api_urls)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def taskList(request):
    user = request.user
    tasks = Task.objects.filter(user=user.pk).order_by("due_date")
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def taskDetail(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def taskCreate(request):
    user = request.user
    request.data["user"] = user.pk
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    user = request.user
    request.data["user"] = user.pk
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print("not valid")
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Deleted")

