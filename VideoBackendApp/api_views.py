from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
# Create your views here.


@api_view
def get_user_details(request, pk): #to get the user details for frontend--> expects POST request
    try:
        user= User.videocon.get(pk=pk)
    except User.DoesNotExist:
        return Response({'no user': 'the user doesn\'t exist'}, status=status.HTTP_404_NOT_FOUND)