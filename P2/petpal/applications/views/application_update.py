from rest_framework.generics import UpdateAPIView
from rest_framework import serializers
from ..models import Application
from applications.serializers import ApplicationSerializer


class ApplicationUpdateAPIView(UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_object(self):
        obj = super(ApplicationUpdateAPIView, self).get_object()
        # Details of an application cannot be updated once submitted/created, except for its status
        if obj.status == 'submitted':
            return obj
        else:
            raise serializers.ValidationError(
                "Details of an application cannot be updated once submitted/created, except for its status.")

    def perform_update(self, serializer):
        # Shelter can only update the status of an application from pending to accepted or denied.
        # Pet seeker can only update the status of an application from pending or accepted to withdrawn.
        if (
            (self.request.user.is_shelter and serializer.validated_data['status'] in ['accepted', 'denied']) or
            (not self.request.user.is_shelter and serializer.validated_data['status'] == 'withdrawn')
        ):
            serializer.save()
        else:
            raise serializers.ValidationError(
                "Invalid update for the application status.")
