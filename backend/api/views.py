from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, BlacklistedToken
from api.users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.common.decorators import response_decorator
from api.common.object_storage_service import object_storage_service
from api.common import constants
from .authenticate import generate_authenticate_token
from . import serializers
from api.common.exceptions import InvalidArgument
import calendar
import time
from rest_framework.permissions import IsAuthenticated


class LoginView(APIView):

    @response_decorator
    def post(self, request, *args, **kwargs):
        data = request.data
        line_token = data.get("line_token")
        user = get_object_or_404(User.objects.all(), line_token=line_token)
        
        return generate_authenticate_token(user)
    

class UploadFile(APIView):

    permission_classes = (IsAuthenticated, )

    @response_decorator
    def post(self, request, *args, **kwargs):
        serializer = serializers.FileUploadSerializer(data=request.data)
        if not serializer.is_valid():
            raise InvalidArgument(serializer.errors)
        
        file = serializer.validated_data.get("file")

        ts = calendar.timegm(time.gmtime())
        filename = f"{ts}-{file.name}"
        object_storage_service.upload_bytes_file(
            file_bytes=file,
            filename=filename,
            bucket=constants.JOB_MATCH_BUCKET_NAME,
            file_type=file.content_type,
        )
        
        return {"filename": filename}