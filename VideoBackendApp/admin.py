from django.contrib import admin
from .models import User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display= ('name', 'surname', 'date_joined')
    list_filter= ['date_joined','username']
    fields= ('name','surname','username', 'email', 'password')
admin.site.register(User, UserAdmin)