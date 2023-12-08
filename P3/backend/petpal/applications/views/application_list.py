from rest_framework import generics
from ..models import Application
from applications.serializers import ApplicationListSerializer, CustomPageNumberPagination
from applications.permissions import IsShelter
from rest_framework.permissions import IsAuthenticated


class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationListSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        status = self.request.query_params.get('status')
        sort_by_creation_time = self.request.query_params.get(
            'sort_by_creation_time', 'false').lower() == 'true'
        sort_by_last_update_time = self.request.query_params.get(
            'sort_by_last_update_time', 'false').lower() == 'true'
        pet_name = self.request.query_params.get('pet_name', '')

        if user.is_shelter():
            queryset = Application.objects.filter(pet_shelter=user)
        else:
            queryset = Application.objects.filter(pet_seeker=user)

        if status in ['pending', 'accepted', 'denied', 'withdrawn']:
            queryset = queryset.filter(status=status)

        if pet_name:
            queryset = queryset.filter(pet_name__icontains=pet_name)

        if sort_by_creation_time:
            queryset = queryset.order_by('-created_at')

        if sort_by_last_update_time:
            queryset = queryset.order_by('-updated_at')

        return queryset
