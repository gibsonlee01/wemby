from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging
from .models import User 
from .serializer import UserSerializer
from django.conf import settings
from django.http import JsonResponse
import requests

logger = logging.getLogger(__name__)

@api_view(['POST'])
def register_user(request):
    logger.info('Received user registration request')
    
    if request.method == 'POST':        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('User created successfully')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print(f'User creation failed: {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_users(request):
    logger.info('Received request to get all users')
    # console.log('Received request to get all users')
    if request.method == 'GET':
        users = User.objects.all()  # 모든 사용자 가져오기
        serializer = UserSerializer(users, many=True)  # 사용자 데이터를 직렬화
        return Response(serializer.data, status=status.HTTP_200_OK)  # 직렬화된 데이터와 함께 응답 반환
    
    
    
@api_view(['POST'])
def kakaopay_ready(request):
    logger = logging.getLogger(__name__)  # 로거 객체 생성
    
    url = "https://kapi.kakao.com/v1/payment/ready"
    headers = {
        "Authorization": f"KakaoAK {settings.KAKAO_API_KEY}",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    data = {
        "cid": "TC0ONETIME",
        "partner_order_id": "partner_order_id",
        "partner_user_id": "partner_user_id",
        "item_name": "Sample Item",
        "quantity": 1,
        "total_amount": 1000,
        "vat_amount": 100,
        "tax_free_amount": 0,
        "approval_url": "http://localhost:3000/list",  # 프론트엔드의 리디렉션 URL
        "fail_url": "http://localhost:3000/list",
        "cancel_url": "http://localhost:3000/list"
    }
    
    try:
        response = requests.post(url, headers=headers, data=data)
        response.raise_for_status()  # HTTP 에러 발생 시 예외 처리
        response_data = response.json()
        return JsonResponse(response_data)
    except requests.exceptions.RequestException as e:
        logger.error(f"KakaoPay API request failed: {e}")
        return JsonResponse({"error": "Failed to initiate KakaoPay"}, status=500)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return JsonResponse({"error": "Internal Server Error"}, status=500)

   
# @api_view(['GET'])
# def get_all_users(request):
#     logger.info('Received request to get all users')

#     if request.method == 'GET':
#         page_number = request.GET.get('page', 1)  # 페이지 번호를 요청에서 가져옴, 기본값은 1
#         page_size = request.GET.get('limit', 3)   # 페이지당 항목 수를 요청에서 가져옴, 기본값은 3

#         users = User.objects.all()  # 모든 사용자 가져오기
#         paginator = Paginator(users, page_size)
        
#         try:
#             users_page = paginator.page(page_number)
#         except PageNotAnInteger:
#             # 요청된 페이지 번호가 정수가 아닌 경우 첫 페이지를 반환
#             users_page = paginator.page(1)
#         except EmptyPage:
#             # 요청된 페이지가 비어 있거나 존재하지 않는 경우 빈 리스트 반환
#             return Response([], status=status.HTTP_200_OK)

#         serializer = UserSerializer(users_page, many=True)  # 사용자 데이터를 직렬화
#         return Response({
#             'data': serializer.data,
#             'total_pages': paginator.num_pages,
#             'current_page': int(page_number),
#             'total_users': paginator.count
#         }, status=status.HTTP_200_OK)  # 직렬화된 데이터와 함께 응답 반환
    
# @api_view(['POST'])
# def register_user(request):
#     logger.info('This is an info message')
    
#     if request.method == 'POST':
#             # name = request.POST.get('name')
#             # gender = request.POST.get('gender')
#             # instagram_id = request.POST.get('instagramId')
#             # bio = request.POST.get('bio')
#             # # 파일 처리
#             # profile_image = request.FILES.get('profileimage')

#             # # 디버깅을 위한 로그 출력
#             # print(f'Name: {name}')
#             # print(f'Gender: {gender}')
#             # print(f'Instagram ID: {instagram_id}')
#             # print(f'Bio: {bio}')

#             # if profile_image:
#             #     print(f'Profile Image: {profile_image.name}')
#     # return Response(True, status=201)
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)