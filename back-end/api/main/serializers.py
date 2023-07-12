from rest_framework import serializers
from main.models import User, ToDoObject

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoObject
        fields = '__all__'
