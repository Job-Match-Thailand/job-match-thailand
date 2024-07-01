import os

from api.common.object_storage_service import object_storage_service

static_bucket_name = "job-match-static"
object_storage_service.create_bucket(static_bucket_name)

AWS_ACCESS_KEY_ID = os.environ.get("OBJECT_STORAGE_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY = os.environ.get("OBJECT_STORAGE_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = static_bucket_name
AWS_S3_ENDPOINT_URL = os.environ.get("OBJECT_STORAGE_HOST")
AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400", "ACL": "public-read"}
DEFAULT_FILE_STORAGE = "job_match.cdn.backends.MediaRootS3BotoStorage"
STATICFILES_STORAGE = "job_match.cdn.backends.StaticRootS3BotoStorage"
