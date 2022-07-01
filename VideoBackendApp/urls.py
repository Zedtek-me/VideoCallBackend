from django.urls import path
from . import api_views
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns= [
    # api views for react authentication
    path('authenticate/', api_views.authen_ticate, name= 'authenticate'),
    path('signup/', api_views.sign_up, name= ' signup'),

    # views for pure django auths and templates
    path('', views.home, name='home page'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('settings/', views.setting, name='profile settings'),
    path('meeting_room/', views.meeting, name='meeting room'),
    path('sign_up/', views.signup, name='backend signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.log_out, name='logout'),
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)