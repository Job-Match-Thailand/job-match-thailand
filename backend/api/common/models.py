from django.db import models
from job_match import settings


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="%(class)s_createdby", null=True, blank=True, on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="%(class)s_updatedby", null=True, blank=True, on_delete=models.CASCADE
    )

    class Meta:
        abstract = True
