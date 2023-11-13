from django.urls import path
from .views import PetSeekerCreate, PetShelterCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'accounts'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/registration/', PetSeekerCreate.as_view(), name='user_create'),
    path('shelter/registration/', PetShelterCreate.as_view(), name='shelter_create'),
]