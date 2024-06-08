from rest_framework import serializers
from api.merchant.models import Merchant

from api.merchant.models import MerchantType


class MerchantCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Merchant
        fields = (
            "id",
            "name",
            "description",
            "image",
            "tel",
            "type",
            "address",
            "sub_district",
            "district",
            "province",
            "post_code",
        )
        read_only_fields = [
            "create_by"
            "create_date"
            "update_date"
        ]

    def perform_create(self, serializer):
        print(self.request.user)
        return serializer.save(clinic=clinic, create_by=user)


class MerchantListSerializer(serializers.ModelSerializer):

    class Meta:
        model = MerchantType
        fields = '__all__'
