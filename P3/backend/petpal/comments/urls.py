from django.urls import path
from .views import ShelterCommentListCreate, ShelterCommentRetrieve, ReplyCreate

app_name = 'comments'
urlpatterns = [
    path('<str:shelter_name>/', ShelterCommentListCreate.as_view()),
    path('<str:shelter_name>/<int:pk>/', ShelterCommentRetrieve.as_view(),name='shelter_comment_retrieve'),
    path('<str:shelter_name>/<int:pk>/replies/', ReplyCreate.as_view()),
]
