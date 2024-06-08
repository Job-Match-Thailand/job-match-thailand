from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.merchant.serializers import MerchantCreateSerializer
from api.merchant.serializers import MerchantListSerializer
from api.merchant.models import MerchantType

from api.merchant.models import Merchant

from django.shortcuts import get_object_or_404


# Create your views here.
class MerchantListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MerchantCreateSerializer

    def get_queryset(self):
        return Merchant.objects.filter(create_by=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(create_by=user)


class MerchantRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MerchantCreateSerializer

    def get_object(self):
        merchant_id = self.kwargs["merchant_id"]
        return get_object_or_404(Merchant, pk=merchant_id)

    def perform_update(self, serializer):
        serializer.save()


class MerchantTypeListView(generics.ListAPIView):
    serializer_class = MerchantListSerializer

    def get_queryset(self):
        return MerchantType.objects.filter(is_active=True)
