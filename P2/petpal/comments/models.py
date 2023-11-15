from django.db import models
from accounts.models import PetUser
from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE)
    create_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True

class ShelterComment(Comment):
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='shelterComments')
    rating = models.IntegerField(null=True, blank=True)

    pet_shelter = models.ForeignKey(
        PetUser,
        on_delete=models.CASCADE,
        related_name='comments_for_shelter',
        limit_choices_to={'shelter_name__isnull': False},
        null=True,
    )
    
    def __str__(self):
        return self.text

class Reply(Comment):
    thread = models.ForeignKey(ShelterComment, on_delete=models.CASCADE, related_name='replies')
      
    class Meta:
        verbose_name_plural = 'replies'

    def __str__(self):
        return 'Re: ' + self.thread.text