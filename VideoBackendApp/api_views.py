from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
import json
from .serializers import UserSerializer
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
# Create your views here.

# login view
@api_view(['POST'])
def authen_ticate(request): #to get the user details in the db for auths.--> expects POST request
    print(request.query_params)
    # user= User.videocon.get(email= request.query_params.get('email'))
    user= authenticate(request.query_params)
    if user:
        login(request, user)#logs in a user on this server if the authenticate func returns a user instance
        serialized_user= UserSerializer(user)
        return Response(serialized_user.data, status.HTTP_200_OK)
    return Response({'no_user': 'the user doesn\'t exist'}, status=status.HTTP_404_NOT_FOUND)


# signup view
@api_view(['POST'])
def sign_up(request):
    data= json.loads(request.body)
    # try catch block for duplicate username
    try:
        serialized_data = UserSerializer(data= data)
    except IntegrityError as err: print(err);return Response('username already exist')

    if serialized_data.is_valid():
        serialized_data.save()
        return Response(serialized_data.data, status.HTTP_201_CREATED)
    else:
        return Response(data='invalid credentials')