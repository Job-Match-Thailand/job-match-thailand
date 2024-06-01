from rest_framework import serializers

from .models import User


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ("id",)

    def get_full_name(self, record):
        return record.get_full_name()

    def get_group(self, record):
        if record.group:
            return record.group.name
        else:
            return ""


class UserDetailSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    updated_by = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_created_by(self, record):
        if record.created_by:
            return f"{record.created_by.first_name} {record.created_by.last_name}"
        return "UNKNOWN"

    def get_updated_by(self, record):
        if record.updated_by:
            return f"{record.updated_by.first_name} {record.updated_by.last_name}"
        return "UNKNOWN"
    

class UserCreateSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    line_token = serializers.CharField(max_length=255)
