from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models import Application
from applications.serializers import SeekerUpdateApplicationSerializer
from applications.serializers import ShelterUpdateApplicationSerializer
from applications.permissions import IsSeeker, IsShelter
from datetime import datetime
from notifications.models import Notification
from django.urls import reverse


class SeekerUpdateApplicationView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = SeekerUpdateApplicationSerializer
    permission_classes = [IsSeeker]

    def get_object(self):
        return Application.objects.get(id=self.kwargs['pk'], pet_seeker=self.request.user)

    def get_serializer(self, instance=None, data=None, many=False, partial=False):
        if instance:
            return self.serializer_class(instance, data=self.request.data, partial=partial)
        return super().get_serializer(instance, data=data, many=many, partial=partial)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(
    #         instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)

    #     if 'status' in serializer.validated_data and serializer.validated_data['status'] == 'withdrawn':
    #         instance.status = 'withdrawn'
    #         instance.save()
    #         return Response({'status': 'withdrawn'})

    #     return Response({'detail': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if 'status' in serializer.validated_data and serializer.validated_data['status'] == 'withdrawn':
            original_status = instance.status
            instance.status = 'withdrawn'
            instance.save()

            # Check if the status has changed
            if instance.status != original_status:
                # Notify the shelter
                shelter_notification_message = f"{instance.pet_seeker.username} has withdrawn the application for {instance.pet_listing.name}."
                application_url = reverse(
                    'applications:application-detail', args=[instance.id])

                Notification.objects.create(
                    user=instance.pet_shelter,
                    message=shelter_notification_message,
                    related_link=application_url
                )

            return Response({'status': 'withdrawn'})

        return Response({'detail': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)


class ShelterUpdateApplicationView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ShelterUpdateApplicationSerializer
    permission_classes = [IsShelter]

    def get_object(self):
        return Application.objects.get(id=self.kwargs['pk'], pet_shelter=self.request.user)

    def get_serializer(self, instance=None, data=None, many=False, partial=False):
        if instance:
            return self.serializer_class(instance, data=self.request.data, partial=partial)
        return super().get_serializer(instance, data=data, many=many, partial=partial)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(
    #         instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)

    #     if 'status' in serializer.validated_data:
    #         new_status = serializer.validated_data['status']

    #         if instance.status == 'pending':
    #             instance.status = new_status
    #             instance.save()
    #             return Response({'status': new_status})
    #         else:
    #             return Response({'detail': f'Invalid status or application is not pending'},
    #                             status=status.HTTP_400_BAD_REQUEST)

    #     return Response({'detail': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if 'status' in serializer.validated_data:
            new_status = serializer.validated_data['status']

            if instance.status == 'pending':
                original_status = instance.status
                instance.status = new_status
                instance.save()

                # Check if the status has changed
                if new_status != original_status:
                    # Notify the pet seeker
                    seeker_notification_message = f"Your application status for {instance.pet_listing.name} has been changed to {new_status}."
                    application_url = reverse(
                        'applications:application-detail', args=[instance.id])

                    Notification.objects.create(
                        user=instance.pet_seeker,
                        message=seeker_notification_message,
                        related_link=application_url
                    )

                return Response({'status': new_status})
            else:
                return Response({'detail': 'Invalid status or application is not pending'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Invalid operation'}, status=status.HTTP_400_BAD_REQUEST)
