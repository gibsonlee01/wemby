from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
def register_user(request):
    logger.info('This is an info message')

    data = request.data['data']
    print('tttttt')
    print(data)
    
    
    
    
    return Response(True, status=201)