from django.urls import path

from . import views

#  /api/v1/merchant/
urlpatterns = [
    path("", views.MerchantListCreateAPIView.as_view()),
    path("<int:merchant_id>/", views.MerchantRetrieveUpdateDestroyAPIView.as_view()),
    path("type/", views.MerchantTypeListView.as_view()),
    # path("<int:pk>/", views.UserView.as_view()),
    # path("me/", views.MeView.as_view()),
]
