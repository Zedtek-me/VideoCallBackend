# Generated by Django 4.0.5 on 2022-07-03 19:56

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='User-name')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('surname', models.CharField(max_length=1000, verbose_name='Surname')),
                ('profile_picture', models.ImageField(default='defualt.jpg', upload_to='profile_pictures/', verbose_name='Profile Image')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='Signed up at')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Last updated')),
                ('is_host', models.BooleanField(default=False, verbose_name='Meeting Host')),
                ('is_guest', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ('email',),
            },
            managers=[
                ('videocon', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=700, verbose_name="meeting's title")),
                ('meeting_id', models.IntegerField(default=5788813688, editable=False, unique=True, verbose_name='meeting id')),
                ('password', models.CharField(blank=True, default=uuid.uuid4, max_length=100, null=True)),
                ('starting', models.DateTimeField(default=datetime.datetime(2022, 7, 3, 20, 56, 4, 55850), max_length=200)),
                ('ending', models.DateTimeField(default=datetime.datetime(2022, 7, 3, 21, 26, 4, 55850), max_length=200)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]