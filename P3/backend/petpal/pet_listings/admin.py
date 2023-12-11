from django.contrib import admin
from .models import PetListing, PetImage

@admin.register(PetListing)
class PetListingAdmin(admin.ModelAdmin):
    change_list_template = "admin/change_list_graph.html"

admin.site.register(PetImage)