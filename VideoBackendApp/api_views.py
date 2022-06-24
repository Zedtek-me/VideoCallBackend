from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
# Create your views here.


@api_view(['GET', 'POST'])
def get_user_details(request, pk): #to get the user details for frontend--> expects POST request
    if request.method == 'GET':
        try:
            user= User.videocon.get(pk=pk)
            serialized_user= UserSerializer(user)
            return Response(serialized_user.data, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'no user': 'the user doesn\'t exist'}, status=status.HTTP_404_NOT_FOUND)
    print(request.data)
    data= UserSerializer(data=request.POST)
    if data.is_valid():
        data.save()
        return Response(data.data, status.HTTP_201_CREATED)
    else: return Response({'Invalid': 'invalid data given'})