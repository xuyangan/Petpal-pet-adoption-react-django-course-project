from rest_framework.generics import RetrieveAPIView
from ..models import Application
from applications.serializers import ApplicationSerializer


class ApplicationRetrieveAPIView(RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
