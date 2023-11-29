from rest_framework.generics import RetrieveAPIView
from ..models import Application
from applications.serializers import GetApplicationSerializer


class ApplicationRetrieveAPIView(RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = GetApplicationSerializer
    lookup_field = 'pk'  # or another field that you use to uniquely identify an Application
