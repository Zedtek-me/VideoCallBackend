from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import User
from django.contrib.auth.decorators import login_required, permission_required


# functional views for requests and response
def home(request):
    # returns the dashboard if login successful
    if request.method == 'POST':
        data= request.POST
        email= data.get('email')
        password= data.get('password')
        user= authenticate(request, email= email, password=password)
        if user:
            login(request, user)
            messages.success(request, 'welcome %s!' %user)
            return redirect('dashboard')
        messages.error(request, 'Email or Password is wrong! Note: they might be case sensitive')
        return redirect('homoe page')
    # take user straight to dashboard if user is authenticated
    if request.user.is_authenticated:
        return redirect('dashboard')
    msg= messages.get_messages(request)
    return render(request, 'login.html', context={'msgs':msg}, content_type='text/html')

def signup(request):
    if request.method == 'POST':
        data= request.POST
        if data.get('password1') == data.get('password2'):#are the two passwords given correct?
            user= User.videocon.create_user(**data)
            messages.success(request, 'signup successful! You can login now.')
            return redirect('login')
        messages.error(request, 'Your passwords didn\'t match; check them well.')
        return('signup')
    # get requests return the signup page
    msgs=messages.get_messages(request)
    return render(request, 'signup.html', context={'msgs':msgs})

@login_required(login_url='home page')
def dashboard(request):
    user = request.user
    msgs=messages.get_messages(request)
    return render(request, 'dashboard.html', context={'user': user, 'msgs':msgs})

@login_required(login_url='home page')
def setting(request):
    user = request.user
    msgs=messages.get_messages(request)
    return render(request, 'settings.html', context={'user': user, 'msgs':msgs}, content_type='text/html')

@login_required(login_url='home page')
def meeting(request):
    user = request.user
    msgs=messages.get_messages(request)
    return render(request, 'meeting_room.html', context={'user': user, 'msgs':msgs}, content_type='text/html')

def log_out(request):
    logout(request)
    return redirect('home page')