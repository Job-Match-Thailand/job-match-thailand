import logging
from functools import wraps

from django.db import transaction
from django.http import Http404
from psycopg2.errors import UniqueViolation
from rest_framework import serializers, status
from rest_framework.response import Response

from .exceptions import AlreadyExists, FailedCondition, InvalidArgument, NotAllowed, NotExist

_logger = logging.getLogger(__name__)


def response_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            with transaction.atomic():
                result = func(*args, **kwargs)
                return Response(
                    {"data": result, "detail": "Success"}, status=status.HTTP_200_OK
                )
        except serializers.ValidationError as e:
            _logger.info(e)
            errors = e.detail
            return Response(
                {"detail": str(errors)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except (InvalidArgument, AlreadyExists, FailedCondition, NotAllowed, NotExist) as e:
            transaction.rollback()
            _logger.exception(e)
            return Response({"detail": str(e)}, status=e.get_status_code())
        except Http404 as e:
            transaction.rollback()
            _logger.exception(e)
            return Response(
                {"detail": str(e)}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            transaction.rollback()
            _logger.exception(e)
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return wrapper


def transaction_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            with transaction.atomic():
                func(*args, **kwargs)
        except Exception as e:
            transaction.rollback()
            _logger.exception(e)

    return wrapper
