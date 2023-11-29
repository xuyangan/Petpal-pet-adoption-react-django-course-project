from django.contrib import admin
from .models import PetListing, PetImage
# Register your models here.

admin.site.register(PetListing)
admin.site.register(PetImage)
