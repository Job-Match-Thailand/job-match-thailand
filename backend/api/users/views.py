import json
from django.core.paginator import EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from api.common.decorators import response_decorator
from api.common.custom_pagination import CustomPagination

from . import serializers
from .models import User
from api.authenticate import generate_authenticate_token

class UserView(APIView):
    """
    List of users
    """

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        elif self.request.method == 'POST':
            return [AllowAny()]
        return super().get_permissions()


    @response_decorator
    def get(self, request, *args, **kwargs):

        pk = kwargs.get("pk")
        if pk is not None:
            user = get_object_or_404(User.objects.all(), pk=pk)
            serializer = serializers.UserDetailSerializer(user)
            return serializer.data

        query_params = request.query_params
        users = User.objects.all().order_by("id")

        paginator = CustomPagination(users, query_params)

        try:
            serializer = serializers.UserListSerializer(
                paginator.paginated(), many=True
            )
            paginator.set_serialized_data(serializer.data)
            return paginator.get_paginated_response()
        except (PageNotAnInteger, EmptyPage):
            return paginator.get_paginated_response()
        
    @response_decorator
    def post(self, request, *args, **kwargs):

        data = request.data
        serializer = serializers.UserCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        user = User(**validated_data)
        user.created_by_id = request.user.id
        user.updated_by_id = request.user.id
        user.save()

        tokens = generate_authenticate_token(user)

        response = {"id": user.id}
        response.update(tokens)

        return response
    
class MeView(APIView):

    permission_classes = (IsAuthenticated, )
    
    @response_decorator
    def get(self, request, *args, **kwargs):
        serializer = serializers.UserDetailSerializer(request.user)
        return serializer.data
