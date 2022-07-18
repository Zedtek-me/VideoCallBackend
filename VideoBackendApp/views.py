from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import User, Meeting
from django.contrib.auth.decorators import login_required, permission_required
from django.db import IntegrityError
from django.utils import timezone
import json


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
                if user:#let users have permissions to join meetings by default when created
                    user.user_permissions.add('VideoBackendApp.can_join_meeting')
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

def log_out(request):
    user= request.user
    logout(request)
    messages.info(request, 'Bye %s' %user)
    return redirect('home page')

def schedule_meeting(request):#handles new meeting that is scheduled from the dashboard; returns back to the dashboard
    user= request.user
    meeting_info= request.GET
    meeting= Meeting.objects.create(host=request.user, title=meeting_info.get('meeting-title'), password=meeting_info.get('meeting-pass'), starting= meeting_info.get('meeting-starting-date'), ending= meeting_info.get('meeting-ending-date'))
    messages.success(request, 'new meeting created!')
    return redirect('dashboard')

# delete, join and start meeting functions defined below
@login_required(login_url='home page')#the start meeting view: expected to direct user to the meeting page or redirect back to dashboard
def start_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    if request.method == "POST":
        meeting_id= json.loads(request.body) #gets the meeting id from request
        db_meeting= Meeting.objects.get(meeting_id= meeting_id)# get meeting from db with its id
        if (db_meeting.host == user):#check if the user is the host, to determine whether to start the meeting for the user or ask him to join the ongoing meeting, if started.
            db_meeting.started= True
            db_meeting.save()
            return JsonResponse({"start": "can start meeting"})
        else: 
            return JsonResponse({"not_host":"you can't start meeting, since you're not the host."})
    context.update(user=user)
    return render(request, 'meeting_room.html', context)

def join_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    meeting_id= json.loads(request.body) #gets the meeting id from request
    db_meeting= Meeting.objects.get(meeting_id= meeting_id)# get meeting from db with its id
    print(db_meeting.title)
    context.update(meeting= db_meeting, user=user)#update template context
    #now check if the meeting has started or not...?
    current_time= timezone.now()
    if (db_meeting.starting <= current_time and db_meeting.started) or (db_meeting.starting >= current_time and db_meeting.started):#the meeting time is due, and has been started, or the meeting time is yet, but has been started.
        return JsonResponse({"join": "can join the meeting"})
    elif db_meeting.starting >= current_time and not db_meeting.started:#meeting starting time isn't yet, and host hasn't started meeting.
        return JsonResponse({"meeting_not_started": "The host has not started this meeting."})
    else:#meeting has likely expired and not restarted
        return JsonResponse({"meeting_ended": "This meeting has ended"})

def delete_meeting(request: HttpRequest)-> HttpResponse:
    context= {}
    user= request.user
    meeting_id= json.loads(request.body)
    try:
        db_meeting= Meeting.objects.get(meeting_id=meeting_id)
        if db_meeting.host == user:
            db_meeting.delete()
        else: return JsonResponse({"not_authorized" :"you're not authorized to delete this meeting."})
    except Exception as err:
        return JsonResponse({"error" : err})
    return JsonResponse({"deleted":"meeting successfully deleted!"})


# end meeting functionality below:
def end_meeting(request):
    pass