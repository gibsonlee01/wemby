from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(null= True, max_length=50)
    gender = models.CharField(null= True, max_length=50)