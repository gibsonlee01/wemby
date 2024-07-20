from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging
from .serializer import UserSerializer

logger = logging.getLogger(__name__)


@api_view(['POST'])
def register_user(request):
    logger.info('This is an info message')
    
    if request.method == 'POST':
            # name = request.POST.get('name')
            # gender = request.POST.get('gender')
            # instagram_id = request.POST.get('instagramId')
            # bio = request.POST.get('bio')
            # # 파일 처리
            # profile_image = request.FILES.get('profileimage')

            # # 디버깅을 위한 로그 출력
            # print(f'Name: {name}')
            # print(f'Gender: {gender}')
            # print(f'Instagram ID: {instagram_id}')
            # print(f'Bio: {bio}')

            # if profile_image:
            #     print(f'Profile Image: {profile_image.name}')
    # return Response(True, status=201)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)