from django.urls import path
from views import AnalyticsCreate

app_name = 'analytics'

urlpatterns = [
    path('/', AnalyticsCreate.as_view(), name='analytics_create'),
]