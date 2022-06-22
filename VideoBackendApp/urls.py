from django.urls import path
from . import api_views
urlpatterns= [
    path('authenticate', api_views.get_user_details, name='authenticate')
]