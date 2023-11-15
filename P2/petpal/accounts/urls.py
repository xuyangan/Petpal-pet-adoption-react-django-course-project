from django.urls import path
from .views import PetSeekerCreate, PetShelterCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PetShelterCreate, PetSeekerCreate, PetShelterUpdate, PetSeekerUpdate, \
    PetShelterProfile, PetSeekerProfile, PetShelterList, PetShelterDestroy, PetSeekerDestroy
app_name = 'accounts'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/shelter/', PetShelterCreate.as_view(), name='pet_shelter_create'),
    path('signup/seeker/', PetSeekerCreate.as_view(), name='pet_seeker_create'),
    path('update/shelter/', PetShelterUpdate.as_view(), name='pet_shelter_update'),
    path('update/seeker/', PetSeekerUpdate.as_view(), name='pet_seeker_update'),
    path('profile/shelter/<int:pk>/', PetShelterProfile.as_view(), name='pet_shelter_profile'),
    path('profile/seeker/<int:pk>/', PetSeekerProfile.as_view(), name='pet_seeker_profile'),
    path('list/shelter/', PetShelterList.as_view(), name='pet_shelter_list'),
    path('delete/shelter/', PetShelterDestroy.as_view(), name='pet_shelter_delete'),
    path('delete/seeker/', PetSeekerDestroy.as_view(), name='pet_seeker_delete'),
]