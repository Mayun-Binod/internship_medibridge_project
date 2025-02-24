from django.contrib import admin
from accounts.models import CustomUser
# Register your models here.
@admin.register(CustomUser)  
class AdminCustomerUser(admin.ModelAdmin):
    list_display = ('id', 'username','email', 'phone_number', 'is_staff', 'is_superuser', 'is_active')
