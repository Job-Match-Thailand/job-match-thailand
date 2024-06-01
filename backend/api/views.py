from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, BlacklistedToken
from api.users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.common.decorators import response_decorator
from .authenticate import generate_authenticate_token


class LoginView(APIView):

    @response_decorator
    def post(self, request, *args, **kwargs):
        data = request.data
        line_token = data.get("line_token")
        user = get_object_or_404(User.objects.all(), line_token=line_token)
        
        return generate_authenticate_token(user)