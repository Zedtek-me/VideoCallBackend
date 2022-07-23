"""
ASGI config for VideoBackend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import URLRouter, ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from VideoBackendApp.channels_routes import websocket_urlpatterns
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'VideoBackend.settings')

application = ProtocolTypeRouter({# instantiates the asgi application for both websocket and http
    'http': get_asgi_application() ,#http
    'websocket' : AuthMiddlewareStack(#auth middleware(or initial view that expands request headers or attrs) for auth attributes like 'user', etc.
        URLRouter(websocket_urlpatterns)#routes to my websocket url patterns, and pass requests from authmid., to my actual views.
    )
})
