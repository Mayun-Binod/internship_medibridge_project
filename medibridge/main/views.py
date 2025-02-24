from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
# Create your views here.
User=get_user_model()
def index(request):
    return render(request,'main/index.html')
