from rest_framework.permissions import BasePermission


class IsShelter(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_shelter

class IsPetUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and not request.user.is_anonymous
        