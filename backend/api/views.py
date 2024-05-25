from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("v1/users/", include("api.users.urls")),
]
