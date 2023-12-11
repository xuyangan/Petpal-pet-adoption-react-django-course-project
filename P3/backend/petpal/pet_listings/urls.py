from django.urls import path
from .views import PetListingRetrieveUpdateDestroy
from .views import PetListingQueryList
from .views import PetListingCreate
from .views import PetListingList
from .views import PetListingShelterList
from .views import TopBreedsChartView



app_name = 'pet_listings'
urlpatterns = [
    path('', PetListingCreate.as_view(), name='pet_listing_create'),
    path('list/', PetListingList.as_view(), name='pet_listing_list'),
    path('<int:pk>/', PetListingRetrieveUpdateDestroy.as_view(), name='pet_listing_retrieve_update_destroy'),
    path('query/', PetListingQueryList.as_view(), name='pet_listing_search'),
    path('<str:shelter_name>/', PetListingShelterList.as_view(), name='pet_listing_shelter_name' ),
    path('top-breeds-chart/', TopBreedsChartView.as_view(), name='top-breeds-chart'),
]
