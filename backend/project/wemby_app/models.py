from django.db import models

class User(models.Model):
    name = models.CharField(max_length=50, null=True) 
    gender = models.CharField(max_length=1, null=True) # M = man, W= woman
    bio = models.TextField(blank=True, null=True)  # 자기소개
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)  # 프로필 사진
    instagram_id = models.CharField(max_length=100, blank=True, null=True)  # 인스타 아이디
    likes = models.PositiveIntegerField(default=0)  # 좋아요 수

    def __str__(self):
        return self.name or 'Unnamed User'
