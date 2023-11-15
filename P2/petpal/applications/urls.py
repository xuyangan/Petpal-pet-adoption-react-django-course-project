from django.urls import path
from .views import ApplicationCreateAPIView
from .views import ApplicationRetrieveAPIView
from .views import SeekerUpdateApplicationView
from .views import ShelterUpdateApplicationView
from .views import ApplicationListView

app_name = 'applications'
urlpatterns = [
    path('create/<int:pk>/', ApplicationCreateAPIView.as_view(),
         name='application_create'),
    path('update/<int:pk>/seeker/', SeekerUpdateApplicationView.as_view(),
         name='seeker-update-application'),
    path('update/<int:pk>/shelter/', ShelterUpdateApplicationView.as_view(),
         name='shelter-update-application'),
    path('list/', ApplicationListView.as_view(),
         name='application-list'),
]
