from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=1000, default="", blank=True)
    completed = models.BooleanField(default=False, blank=True, null=True)
    due_date = models.DateTimeField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title
