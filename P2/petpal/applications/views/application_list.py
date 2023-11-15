from rest_framework import generics
from ..models import Application
from applications.serializers import ApplicationListSerializer, CustomPageNumberPagination
from applications.permissions import IsShelter


class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationListSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = [IsShelter]

    def get_queryset(self):
        queryset = self.get_shelter_queryset()

        status = self.request.query_params.get('status', 'pending')
        sort_by_creation_time = self.request.query_params.get(
            'sort_by_creation_time', 'false').lower() == 'true'
        sort_by_last_update_time = self.request.query_params.get(
            'sort_by_last_update_time', 'false').lower() == 'true'

        if status in ['pending', 'accepted', 'denied', 'withdrawn']:
            queryset = queryset.filter(status=status)

        if sort_by_creation_time:
            queryset = queryset.order_by('-created_at')

        if sort_by_last_update_time:
            queryset = queryset.order_by('-updated_at')

        return queryset

    def get_shelter_queryset(self):
        pet_shelter_user = self.request.user
        if pet_shelter_user.is_shelter():
            return Application.objects.filter(pet_shelter=pet_shelter_user)
        else:
            return Application.objects.all()
