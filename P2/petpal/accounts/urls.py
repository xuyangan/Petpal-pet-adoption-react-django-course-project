from django.urls import path
from .views import PetSeekerCreate, PetShelterCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PetShelterCreate, PetSeekerCreate

app_name = 'accounts'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/shelter/', PetShelterCreate.as_view(), name='pet_shelter_create'),
    path('signup/seeker/', PetSeekerCreate.as_view(), name='pet_seeker_create'),
]