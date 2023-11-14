from rest_framework.generics import CreateAPIView
from rest_framework import serializers
from ..models import Application
from applications.serializers import ApplicationSerializer


class ApplicationCreateAPIView(CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def post(self, request, *args, **kwargs):
        try:
            # Check if the associated PetListing is "available"
            if request.data['pet_listing']['status'] == 'available':
                return super(ApplicationCreateAPIView, self).post(request, *args, **kwargs)
            else:
                raise serializers.ValidationError(
                    "Can only create applications for a pet listing that is 'available'.")
        except KeyError:
            raise serializers.ValidationError("Invalid payload.")
