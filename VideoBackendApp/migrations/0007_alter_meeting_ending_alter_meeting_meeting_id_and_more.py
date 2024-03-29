# Generated by Django 4.0.5 on 2022-07-17 10:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VideoBackendApp', '0006_alter_meeting_options_meeting_started_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='ending',
            field=models.DateTimeField(default=datetime.datetime(2022, 7, 17, 11, 57, 32, 219366), max_length=200),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='meeting_id',
            field=models.UUIDField(default=3768229431, editable=False, primary_key=True, serialize=False, unique=True, verbose_name='meeting id'),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='starting',
            field=models.DateTimeField(default=datetime.datetime(2022, 7, 17, 11, 27, 32, 219366), max_length=200),
        ),
    ]
