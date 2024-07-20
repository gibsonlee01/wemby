from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'gender', 'bio', 'profile_picture', 'instagram_id', 'likes']
