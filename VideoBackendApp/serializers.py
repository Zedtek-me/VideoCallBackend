from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['name', 'username', 'email','is_superuser','is_staff','is_admin','is_active']