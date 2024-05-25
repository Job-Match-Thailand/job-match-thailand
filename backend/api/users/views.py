import json
from django.core.paginator import EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from api.common.decorators import response_decorator
from api.common.custom_pagination import CustomPagination

from . import serializers
from .models import User

class UserView(APIView):
    """
    List of users
    """

    # permission_classes = (IsAuthenticated,)

    @response_decorator
    def get(self, request, *args, **kwargs):

        pk = kwargs.get("pk")
        if pk is not None:
            user = get_object_or_404(User.objects.all(), pk=pk)
            serializer = serializers.UserDetailSerializer(user)
            return serializer.data

        query_params = request.query_params
        users = User.objects.all().order_by("id")

        # only_user = query_params.get("only_user")
        # if only_user == "Yes":
        #     not_want_user = q = Q(email="erp@no-reply.com") | Q(
        #         email="system@no-reply.com"
        #     )
        #     users = users.exclude(not_want_user)

        paginator = CustomPagination(users, query_params)

        try:
            serializer = serializers.UserListSerializer(
                paginator.paginated(), many=True
            )
            paginator.set_serialized_data(serializer.data)
            return paginator.get_paginated_response()
        except (PageNotAnInteger, EmptyPage):
            return paginator.get_paginated_response()