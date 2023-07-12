from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main import views


urlpatterns = [
    path('api/users/', views.UserList.as_view()),
    path('api/register/', views.Register.as_view()),
    path('api/login/', views.Login.as_view()),
    path('api/todo/', views.ToDo.as_view()),
    path('api/todo/<pk>/', views.ToDo.as_view()),
    path('api/reset/', views.AccountReset.as_view())
]
