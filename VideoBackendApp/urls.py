from django.urls import path
from . import api_views
from . import views
urlpatterns= [
    # api views for react authentication
    path('authenticate/', api_views.authen_ticate, name= 'authenticate'),
    path('signup/', api_views.sign_up, name= ' signup'),

    # views for pure django auths and templates
    path('', views.home, name='home page'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('settings/', views.setting, name='profile settings'),
    path('meeting_room/', views.meeting, name='meeting room')
]