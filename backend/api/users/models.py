from api.common.models import BaseModel
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, mobile, password=None):
        """Create new user profile"""
        if not mobile:
            raise ValueError("user must have a mobile")
        
        if len(mobile) < 10 or len(mobile) > 15:
            raise ValueError("mobile number should be between 10 to 15")

        user = self.model(mobile=mobile)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, mobile, password=None):
        """Create and save a new superuser with given details"""
        user = self.create_user(password=password, mobile=mobile)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user.mobile


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """Custom user model"""

    id = models.AutoField(primary_key=True)
    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    line_token = models.CharField(max_length=255)
    identity_card_number = models.CharField(max_length=15, blank=True, null=True)
    identity_card_expire_date = models.DateField(null=True)
    identity_user_image_path = models.TextField(blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    approve_date = models.DateTimeField(null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    EMAIL_FIELD = "mobile"
    USERNAME_FIELD = "mobile"

    objects = UserManager()

    def __str__(self):
        return str(self.mobile)

    def get_full_name(self):
        return ("%s %s") % (self.first_name, self.last_name)

    class Meta:
        abstract = False
        db_table = "users"
        indexes = [
            models.Index(
                fields=[
                    "mobile",
                    "line_token"
                ]
            ),
        ]
