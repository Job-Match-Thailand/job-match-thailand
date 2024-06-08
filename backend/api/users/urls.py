from django.urls import path

from . import views

#  api/v1/users/
urlpatterns = [
    path("", views.UserView.as_view()),
    path("<int:pk>/", views.UserView.as_view()),
    path("me/", views.MeView.as_view()),
]
