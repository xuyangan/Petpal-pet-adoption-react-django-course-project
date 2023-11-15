from rest_framework.generics import CreateAPIView
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from ..models import Application
from applications.serializers import CreateApplicationSerializer
from pet_listings.models import PetListing
from django.http import Http404
from rest_framework.response import Response
from applications.permissions import IsSeeker


class ApplicationCreateAPIView(CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = CreateApplicationSerializer
    permission_classes = [IsSeeker]

    def perform_create(self, serializer):
        pet_listing_id = self.kwargs.get('pk')
        pet_listing = get_object_or_404(PetListing, id=pet_listing_id)
        serializer.save(pet_name=pet_listing.name, pet_listing=pet_listing,
                        pet_seeker=self.request.user, pet_shelter=pet_listing.shelter)

    def post(self, request, *args, **kwargs):
        try:
            pet_listing_id = self.kwargs.get('pk')
            pet_listing = get_object_or_404(PetListing, id=pet_listing_id)
            pet_listing_status = pet_listing.status

            if pet_listing_status == 'available':
                return super(ApplicationCreateAPIView, self).post(request, *args, **kwargs)
            else:
                raise serializers.ValidationError(
                    "Can only create applications for a pet listing that is 'available'.")
        except Http404:
            raise serializers.ValidationError("Invalid pet listing ID.")
