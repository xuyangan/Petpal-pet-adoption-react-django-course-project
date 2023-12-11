from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from ..models import PetListing 
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissions 

class TopBreedsChartView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    def get_authenticators(self):
        if self.request.method == 'GET':
            self.authentication_classes = [SessionAuthentication]
        return super(TopBreedsChartView, self).get_authenticators()

    def get(self, request, *args, **kwargs):
        # print(request.user)  # Check the user
        # print(request.user.is_authenticated)  # Check if the user is authenticated
        breed_data = PetListing.objects.values('breed') \
                                       .annotate(count=Count('breed')) \
                                       .order_by('-count')[:10]  # Adjust the number as needed
        return Response(breed_data)
