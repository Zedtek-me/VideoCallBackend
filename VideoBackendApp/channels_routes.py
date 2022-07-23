from django.urls import re_path
from .consumer import UserSignal

websocket_urlpatterns= [
    re_path(r'^signal$', UserSignal.as_asgi()),
]