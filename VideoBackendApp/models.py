from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.forms import ValidationError
import random
from datetime import datetime, timedelta
import uuid

# custom user manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, surname, username, password= None):
        if not email:
            raise ValidationError("You must include a username for this user!")
        user= self.model(email= self.normalize_email(email), name= name, surname= surname, username= username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,**kwargs):
        user= self.create_user(**kwargs)
        user.is_superuser= True
        user.is_admin= True
        user.is_staff= True
        user.save()
        return user

# custom user model
class User(AbstractBaseUser, PermissionsMixin):
    name= models.CharField(
        verbose_name='Name',
        max_length=100, unique=False,
        blank=False,
        null=False
    )
    username= models.CharField(
        verbose_name='User-name',
        max_length=100,
        blank=False,
        null=False,
        unique= True,
    )
    email=models.EmailField(
        verbose_name='Email', 
        blank=False, 
        null=False,
        unique=True,
        )
    surname=models.CharField(
        verbose_name='Surname', 
        blank=False,
        null=False, 
        max_length=1000
    )
    profile_picture= models.ImageField(
        verbose_name='Profile Image',
        upload_to='profile_pictures/', 
        default='default.jpg'
        )
    date_joined= models.DateTimeField(
        verbose_name='Signed up at',
        auto_now_add=True,
        )
    date_updated= models.DateTimeField(
        verbose_name='Last updated',
        auto_now=True,
    )

    is_host= models.BooleanField(
        verbose_name='Meeting Host',
        default=False,
    )

    is_guest= models.BooleanField(
        default=True
        )
    
    is_staff= models.BooleanField(default=False)
    is_admin= models.BooleanField(default=False)
    is_active= models.BooleanField(default=True)
    is_superuser= models.BooleanField(default=False)

    videocon=UserManager() #instantiated user manager

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS= ['name', 'surname', 'username']
    EMAIL_FIELD= 'email'

    def has_perm(self,perm, obj=None):
        return True

    def has_module_perms(self,app_label):
        return self.has_perm(app_label)

    def __str__(self):
        return self.username

    class Meta:
        ordering=('email',)




# other tables start here
class Meeting(models.Model):
    '''
    In this table, I use the meeting_id column as the primary key. The column is an instance of models.CharField, however, the value it holds would always be a uuid value.
    I tried using the integer form of uuid on the column by calling and indexing the int attribute on the field, or by using the time_flow attribute.
    I have resorted to the default uuid4 value. However, when I need to present this value to a user, I should remember to use the time_flow attribute on the field, in order to 
    return ten integers.
    '''
    def generate_random_id():#random id generator for meeting
        '''
        intended for generating a random unique 10 integers as meeting ids
        '''
        import uuid
        return uuid.uuid4().time_low

    host= models.ForeignKey(User, on_delete= models.CASCADE)
    title= models.CharField('meeting\'s title', max_length=700, unique=False, editable=True)
    meeting_id= models.CharField('meeting id',max_length=300, unique=True , default=generate_random_id, editable=False, primary_key=True)
    password= models.CharField(max_length=100, unique=False, null=True, blank=True, default=uuid.uuid4)
    starting= models.DateTimeField(default=datetime.now(), max_length=200)
    ending= models.DateTimeField(default=datetime.now() + timedelta(minutes=30), max_length=200)
    started = models.BooleanField(default=False)

    def __str__(self):
        return self.title


    def __repr__(self) -> str:
        return self.title

    class Meta:
        permissions=[('can_start_meeting', 'can start a meeting'),('can_join_meeting', 'can join a meeting'), ('can_delete_meeting', 'can delete meeting')]