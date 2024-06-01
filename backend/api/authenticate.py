from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from api.users.models import User


def generate_authenticate_token(user: User):
    access_token = AccessToken.for_user(user=user)
    refresh_token = RefreshToken.for_user(user=user)
    
    return {'access': str(access_token), 'refresh': str(refresh_token)}