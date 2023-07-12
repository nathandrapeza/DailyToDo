from tkinter import CASCADE
from django.db import models
import time
import uuid
from datetime import datetime, date

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # using the function uuid4 on the module
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=30)

class ToDoObject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)
    complete = models.BooleanField(default=False)
    duedate = models.DateField(auto_now_add=False, auto_now=False, blank=True)
    date_submitted = models.DateField(auto_now_add=True, auto_now=False, blank=True)

class AccountResetObject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    reset_code = models.CharField(max_length=1000)
