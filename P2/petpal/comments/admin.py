from django.contrib import admin
from .models import ApplicationComment, ShelterComment, Reply

# Register your models here.
admin.site.register(ApplicationComment)
admin.site.register(ShelterComment)
admin.site.register(Reply)