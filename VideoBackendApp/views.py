from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import User


# function views for requests and response
def home(request):
    # returns the login page
    return render(request, 'login.html', context={}, content_type='text/html')

def signup(request):
    return render(request, 'signup.html', context={})

def dashboard(request):
    return render(request, 'dashboard.html', context={})

def setting(request):
    return render(request, 'settings.html', context={}, content_type='text/html')

def meeting(request):
    return render(request, 'meeting_room.html', context={}, content_type='text/html')

