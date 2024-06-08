from django.db import models
from api.users.models import User


class MerchantType(models.Model):

    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Merchant(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    image = models.TextField(null=True)
    tel = models.CharField(max_length=30)
    type = models.ForeignKey(MerchantType, on_delete=models.PROTECT)

    # address
    address = models.CharField(max_length=300)
    sub_district = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    province = models.CharField(max_length=50)
    post_code = models.CharField(max_length=5, null=True)

    del_flag = models.BooleanField(default=False)

    # log
    create_by = models.ForeignKey(User, on_delete=models.PROTECT)
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
