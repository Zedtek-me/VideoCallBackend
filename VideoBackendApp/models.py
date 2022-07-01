from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.forms import ValidationError

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
        default='defualt.jpg'
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
        return True

    def __str__(self):
        return self.username

    class Meta:
        ordering=('email',)


# other tables start here