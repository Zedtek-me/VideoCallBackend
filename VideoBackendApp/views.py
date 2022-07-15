from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import User, Meeting
from django.contrib.auth.decorators import login_required, permission_required
from django.db import IntegrityError
from django.utils import timezone


# a utility function that returns an an iterable of scheduled and recent meetings
def current_and_past_meetings():
    recent_meetings= Meeting.objects.filter(starting__lt=timezone.now())
    upcoming_meetings= Meeting.objects.filter(ending__gt=timezone.now())
    return recent_meetings, upcoming_meetings

# functional views for requests and response (not meant to be consumed by the react frontend. Just dedicated, entirely to the host(domain) of this backend app.)
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
        return redirect('home page')
    # take user straight to dashboard if user is authenticated
    if request.user.is_authenticated:
        return redirect('dashboard')
    msg= messages.get_messages(request)
    return render(request, 'login.html', context={'msgs':msg}, content_type='text/html')

def signup(request):
    if request.method == 'POST':
        data= request.POST
        username= data.get('username')
        name=data.get('name')
        email= data.get('email')
        surname= data.get('surname')
        password1= data.get('password1')
        password2= data.get('password2')
        if password1 == password2:#are the two passwords given correct?
            # confirm whether username has not been claimed by others.
            try:
                user= User.videocon.create_user(email=email, username=username, name=name, surname=surname, password=password1)
                messages.success(request, 'signup successful! You can login now.')
                return redirect('home page')
            except IntegrityError:
                messages.error(request, 'Username is already taken! chose other usernames.')
                return redirect('backend signup')
        messages.error(request, 'Your passwords didn\'t match; check them well.')
        return('backend signup')
    # get requests return the signup page
    msgs=messages.get_messages(request)
    return render(request, 'signup.html', context={'msgs':msgs})

@login_required(login_url='home page')
def dashboard(request):
    user = request.user
    recent, coming= current_and_past_meetings()
    msgs=messages.get_messages(request)
    return render(request, 'dashboard.html', context={'user': user, 'msgs':msgs, 'recent': recent, 'current': coming})

@login_required(login_url='home page')
def setting(request):
    user = request.user
    msgs=messages.get_messages(request)
    return render(request, 'settings.html', context={'user': user, 'msgs':msgs}, content_type='text/html')

# the meeting room view-> reserver for only loggedin users who have permissions to start a meeting, or have requested to join a meeting
@login_required(login_url='home page')
@permission_required(['VideoBackendApp.can_start_meeting', 'VideoBackendApp.can_join_meeting'], login_url='home page', raise_exception=True)
def meeting(request):
    user = request.user
    msgs=messages.get_messages(request)
    return render(request, 'meeting_room.html', context={'user': user, 'msgs':msgs}, content_type='text/html')

def log_out(request):
    user= request.user
    logout(request)
    messages.info(request, 'Bye %s' %user)
    return redirect('home page')

def schedule_meeting(request):#handles new meeting that is scheduled from the dashboard; returns back to the dashboard
    meeting_info= request.GET
    meeting= Meeting.objects.create(host=request.user, title=meeting_info.get('meeting-title'), password=meeting_info.get('meeting-pass'), starting= meeting_info.get('meeting-starting-date'), ending= meeting_info.get('meeting-ending-date'))
    messages.success(request, 'new meeting created!')
    return redirect('dashboard')

# delete, join and start meeting functions defined below
def start_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    meeting_id= request.body
    print(meeting_id)
    return redirect('meeeting_room')

def join_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    meeting_id= request.body
    print(meeting_id)
    return redirect('meeeting_room')

def delete_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    meeting_id= request.body
    print(meeting_id)
    return redirect('meeeting_room')