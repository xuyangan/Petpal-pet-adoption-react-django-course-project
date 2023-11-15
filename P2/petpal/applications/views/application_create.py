from rest_framework.generics import CreateAPIView
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from ..models import Application
from applications.serializers import CreateApplicationSerializer
from pet_listings.models import PetListing
from django.http import Http404
from rest_framework.response import Response
from applications.permissions import IsSeeker
from datetime import datetime
from notifications.models import Notification
from django.urls import reverse


class ApplicationCreateAPIView(CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = CreateApplicationSerializer
    permission_clases = [IsSeeker]

    # def perform_create(self, serializer):
    #     pet_listing_id = self.kwargs.get('pk')
    #     pet_listing = get_object_or_404(PetListing, id=pet_listing_id)
    #     serializer.save(pet_name=pet_listing.name, pet_listing=pet_listing,
    #                     pet_seeker=self.request.user, pet_shelter=pet_listing.shelter, created_at=datetime.now(), updated_at=datetime.now())
    def perform_create(self, serializer):
        pet_listing_id = self.kwargs.get('pk')
        pet_listing = get_object_or_404(PetListing, id=pet_listing_id)
        
        # Create the application
        application = serializer.save(pet_name=pet_listing.name, pet_listing=pet_listing,
                                      pet_seeker=self.request.user, pet_shelter=pet_listing.shelter,
                                      created_at=datetime.now(), updated_at=datetime.now())

        # Create a notification for the shelter
        notification_message = f"Your pet listing: {pet_listing.name} has received an application from seeker: {self.request.user.username}"
        application_url = reverse('applications:application-detail', args=[application.id])

        Notification.objects.create(
            user_id=pet_listing.shelter,
            message=notification_message,
            related_link=application_url)
        
        seeker_notification_message = f"Your submission on the pet listing: {pet_listing.name} is successful and under reviewing."
        
        Notification.objects.create(
            user_id=self.request.user,
            message=seeker_notification_message,
            related_link=application_url  # Optional, can provide a link to view the application
        )
        
    def post(self, request, *args, **kwargs):
        try:
            pet_listing_id = self.kwargs.get('pk')
            pet_listing = get_object_or_404(PetListing, id=pet_listing_id)
            pet_listing_status = pet_listing.status

            if pet_listing_status != 'available':
                raise serializers.ValidationError("Can only create applications for a pet listing that is 'available'.")

            # Check if the seeker has already applied for this pet listing
            existing_application = Application.objects.filter(pet_listing=pet_listing, pet_seeker=request.user).exists()
            if existing_application:
                raise serializers.ValidationError("You have already applied for this pet listing.")

            return super().post(request, *args, **kwargs)
        except Http404:
            raise serializers.ValidationError("Invalid pet listing ID.")
