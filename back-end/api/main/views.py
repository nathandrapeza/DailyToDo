from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from main.models import User, ToDoObject, AccountResetObject
from main.serializers import UserSerializer, ToDoSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
import random


class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        if User.objects.filter(username=request.data['username']).exists():
            user_object = User.objects.filter(username=request.data['username'])[0]
            username = user_object.username
            password = user_object.password
            if request.data['password'] == password:
                serializer= UserSerializer(user_object)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ToDo(APIView):
    def post(self, request):
        user_username = request.data['user']['username']
        user_object = User.objects.filter(username=user_username)[0]
        description = request.data['task']
        duedate = request.data['duedate']['date']
        date_obj = datetime.datetime(int(duedate[0:4]), int(duedate[5:7]), int(duedate[8:10]))

        # Format: todo_item_dict = {'owner':user_object, 'description':description, 'duedate':date_obj}
        todo_item = ToDoObject(owner=user_object, description=description, duedate=date_obj)
        todo_item.save()
        return Response(status=200)

    def get(self, request, pk):
        user_object = User.objects.filter(id=pk)[0]
        todo_items = ToDoObject.objects.filter(owner=user_object).order_by('duedate')
        serializer = ToDoSerializer(todo_items, many=True)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, pk):
        todo_item = ToDoObject.objects.filter(id=pk)[0]
        todo_item.complete = not todo_item.complete
        todo_item.save()
        return Response(status=200)

    def delete(self, request, pk):
        todo_item = ToDoObject.objects.filter(id=pk)[0]
        todo_item.delete()
        return Response(status=200)

class AccountReset(APIView):
    def post(self, request):
        user_email = request.data['email']
        user_object = User.objects.filter(email=user_email)
        if bool(user_object):
            if bool(AccountResetObject.objects.filter(account=user_object[0])):
                return Response(status=200)
            else:
                new_reset_object = AccountResetObject(account=user_object, reset_code=str(random.randint(500000,999999)))
                new_reset_object.save()
                pass # email the user
                return Response(status=200)
        # invalid email entered
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user_email = request.data['email']
        new_password = request.data['password']
        user_object = User.objects.filter(email=user_email)[0]
        reset_code = str(request.data['resetCode'])
        account_reset_object = AccountResetObject.objects.filter(account=user_object, reset_code=reset_code)
        if bool(account_reset_object):
            user_object.password = new_password
            user_object.save()
            return Response(status=200)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            



'''
def user_list(request):
    """
    List all users
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
'''