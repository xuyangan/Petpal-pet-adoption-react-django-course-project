from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from analytics.models import Analytics
from analytics.serializers import AnalyticsSerializer

# Create your views here.
class AnalyticsCreate(CreateAPIView):
    model = Analytics
    serializer_class = AnalyticsSerializer
    permission_classes = (AllowAny,)