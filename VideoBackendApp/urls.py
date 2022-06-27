from django.urls import path
from . import api_views
urlpatterns= [
    path('authenticate/', api_views.authen_ticate, name= 'authenticate'),
    path('signup/', api_views.sign_up, name= ' signup'),
]