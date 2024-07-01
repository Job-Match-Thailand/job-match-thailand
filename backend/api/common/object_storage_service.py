import logging
import os

import boto3
import botocore

_logger = logging.getLogger(__name__)


class ObjectStorageService:
    def __init__(self):
        self.s3 = self.get_client()

    def get_client(self):
        return boto3.client(
            "s3",
            endpoint_url=os.environ.get("OBJECT_STORAGE_HOST"),
            aws_access_key_id=os.environ.get("OBJECT_STORAGE_ACCESS_KEY"),
            aws_secret_access_key=os.environ.get("OBJECT_STORAGE_SECRET_ACCESS_KEY"),
        )

    def upload_bytes_file(self, file_bytes, filename, bucket, file_type):
        self.create_bucket(bucket=bucket)
        self.s3.put_object(
            Body=file_bytes, Bucket=bucket, Key=filename, ContentType=file_type
        )

    def get_file(self, bucket, filename):
        data = self.s3.get_object(Bucket=bucket, Key=filename)
        return data["Body"].read()

    def create_bucket(self, bucket):
        try:
            self.s3.create_bucket(Bucket=bucket)
        except botocore.exceptions.ClientError as e:
            _logger.warning(f"Bucket {bucket}: AlreadyOwnExists")
        except Exception as e:
            _logger.exception(e)


object_storage_service = ObjectStorageService()
