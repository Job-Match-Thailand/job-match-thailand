from django.urls import include, path
from . import views

urlpatterns = [
    path("v1/users/", include("api.users.urls")),
    path("v1/login/", views.LoginView.as_view()),
]
