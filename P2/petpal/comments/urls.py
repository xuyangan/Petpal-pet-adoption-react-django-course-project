from django.urls import path
from .views import ShelterCommentListCreate, ShelterCommentRetrieve, ReplyCreate

app_name = 'comments'
urlpatterns = [
    path('', ShelterCommentListCreate.as_view()),
    path('<int:pk>/', ShelterCommentRetrieve.as_view()),
    path('<int:pk>/reply/', ReplyCreate.as_view()),
]
