from django.urls import include, path
from . import views

urlpatterns = [
    path("v1/users/", include("api.users.urls")),
    path("v1/login/", views.LoginView.as_view()),
    path("v1/merchant/", include("api.merchant.urls")),
    path("v1/upload-file/", views.UploadFile.as_view())
]
