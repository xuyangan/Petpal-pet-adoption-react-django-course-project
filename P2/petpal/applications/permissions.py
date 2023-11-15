from rest_framework.permissions import BasePermission
from rest_framework.permissions import BasePermission
from .models import Application

class IsSeeker(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and not request.user.is_shelter()


class IsShelter(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_shelter()

class IsRelatedToApplication(BasePermission):
    def has_permission(self, request, view):
        application_id = view.kwargs.get('pk')
        application = Application.objects.filter(id=application_id).first()

        if application:
            return request.user == application.pet_seeker or request.user == application.pet_shelter
        return False
