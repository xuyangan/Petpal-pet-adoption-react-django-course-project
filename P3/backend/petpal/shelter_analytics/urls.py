from django.urls import path
from .views import ShelterAnalyticsRetrieve

app_name = 'shelter_analytics'

urlpatterns = [
    path('<str:sheltername>/',  ShelterAnalyticsRetrieve.as_view(), name='shelter_analytics_retrieve'),
]