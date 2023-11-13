from django.db import models
from accounts.models import PetUser

# Create your models here.
from django.db import models
from accounts.models import PetUser

# Create your models here.
class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE)
    create_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True

class ApplicationComment(Comment):
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='appComments')
    
    def __str__(self):
        return self.text

class ShelterComment(Comment):
    user = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='shelterComments')
    rating = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.text

class Reply(Comment):
    thread = models.ForeignKey(ShelterComment, on_delete=models.CASCADE, related_name='replies')
      
    class Meta:
        verbose_name_plural = 'replies'

    def __str__(self):
        return 'Re: ' + self.thread.text

# class ShelterComment(models.Model):
#     commenter = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='commenter')
#     comment = models.TextField()
#     rating = models.IntegerField(null=True, blank=True)
#     replied = models.ForeignKey(PetUser, null=True, on_delete=models.CASCADE, related_name='replied')
# class ApplicationComment(models.Model):
#     commenter = models.ForeignKey(PetUser, on_delete=models.CASCADE, related_name='commenter')
#     comment = models.TextField()
#     replied = models.ForeignKey(PetUser, null=True, on_delete=models.CASCADE, related_name='replied')