from django.urls import path
from .views import ApplicationCreateAPIView
from .views import ApplicationUpdateAPIView
from .views import ApplicationListAPIView
from .views import ApplicationRetrieveAPIView

app_name = 'applications'
urlpatterns = [
    path('create/<int:pk>/', ApplicationCreateAPIView.as_view(),
         name='application_create'),
]
