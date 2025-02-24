from django.contrib.auth.models import AbstractUser
from django.db import models
from accounts.manager import UserManager
# Custom User Model
class CustomUser(AbstractUser):
    USER_ROLES = (
        ('PATIENT', 'Patient'),
        ('DOCTOR', 'Doctor'),
        ('ADMIN', 'Admin'),
    )
    username = models.CharField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='PATIENT')
    user_bio = models.TextField(blank=True, null=True)
    user_profile_image = models.ImageField(upload_to='profile_custom/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'username']

    objects = UserManager()

    def __str__(self):
        return self.email