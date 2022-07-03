from django.contrib import admin
from .models import User, Meeting
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display= ('name', 'surname', 'date_joined')
    list_filter= ['date_joined','username']
    fields= ('name','surname','username', 'email', 'password', 'profile_picture')


class MeetingAdmin(admin.ModelAdmin):
    list_display= ('title', 'host','starting', 'ending')
    list_filter= ('starting', 'ending','host', 'title')


admin.site.register(User, UserAdmin)
admin.site.register(Meeting, MeetingAdmin)