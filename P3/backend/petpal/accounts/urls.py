from django.urls import path
from .views import PetSeekerCreate, PetShelterCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PetShelterCreate, PetSeekerCreate, PetShelterUpdate, PetSeekerUpdate, \
    PetShelterProfile, PetSeekerProfile, PetShelterList, PetShelterDestroy, PetSeekerDestroy
app_name = 'accounts'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/new_token/', TokenRefreshView.as_view(), name='new_token'),
    path('signupform/shelter/', PetShelterCreate.as_view(), name='pet_shelter_create'),
    path('signupform/seeker/', PetSeekerCreate.as_view(), name='pet_seeker_create'),
    path('updateform/shelter/', PetShelterUpdate.as_view(), name='pet_shelter_update'),
    path('updateform/seeker/', PetSeekerUpdate.as_view(), name='pet_seeker_update'),
    path('profile/shelter/<str:pk>/', PetShelterProfile.as_view(), name='pet_shelter_profile'),
    path('profile/seeker/<str:pk>/', PetSeekerProfile.as_view(), name='pet_seeker_profile'),
    path('list/shelter/', PetShelterList.as_view(), name='pet_shelter_list'),
    path('removal/shelter/', PetShelterDestroy.as_view(), name='pet_shelter_delete'),
    path('removal/seeker/', PetSeekerDestroy.as_view(), name='pet_seeker_delete'),
]