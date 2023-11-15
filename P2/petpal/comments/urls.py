from django.urls import path
from .views import ShelterCommentListCreate, ShelterCommentRetrieve, ReplyCreate

app_name = 'comments'
urlpatterns = [
    path('<int:shelter_pk>/', ShelterCommentListCreate.as_view()),
    path('<int:shelter_pk>/<int:pk>/', ShelterCommentRetrieve.as_view(),name='shelter_comment_retrieve'),
    path('<int:shelter_pk>/<int:pk>/reply/', ReplyCreate.as_view()),
]
