from rest_framework.permissions import BasePermission


class IsSeeker(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and not request.user.is_shelter()
