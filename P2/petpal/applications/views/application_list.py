from rest_framework.generics import ListAPIView
from ..models import Application
from applications.serializers import ApplicationSerializer


class ApplicationListAPIView(ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        # Shelters can only view their own applications, not that of other shelters.
        if self.request.user.is_shelter:
            return Application.objects.filter(pet_listing__shelter=self.request.user)
        else:
            return Application.objects.filter(user=self.request.user)

    def filter_queryset(self, queryset):
        # Filter applications by status
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param)
        return queryset

    def sort_queryset(self, queryset):
        # Sort application by creation time and last update time
        return queryset.order_by('-created_at', '-last_updated_at')
