from django.urls import path
from .views import AnalyticsRetrieve

app_name = 'analytics'

urlpatterns = [
    path('', AnalyticsRetrieve.as_view(), name='analytics_retrieve'),
]