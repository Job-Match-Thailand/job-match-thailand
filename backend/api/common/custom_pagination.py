import math

from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import connection
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from . import helpers


class CustomPagination:
    total = 0
    last_page = 1

    def __init__(self, queryset, query_params, data=[]):
        self.queryset = queryset
        self.data = data
        self.page = int(query_params.get("page", 1))
        self.per_page = int(query_params.get("per_page", 10))
        self.sort_field = query_params.get("sort_field", "id")
        self.sort_order = query_params.get("sort_order", "DESC")

    def set_serialized_data(self, data):
        self.data = data

    def paginated(
        self,
    ):
        if self.sort_order == "DESC":
            self.queryset = self.queryset.order_by(f"-{self.sort_field}")
        else:
            self.queryset = self.queryset.order_by(f"{self.sort_field}")
        paginator = Paginator(self.queryset, self.per_page)
        self.last_page = paginator.num_pages
        self.total = self.queryset.count()

        return paginator.page(self.page)

    def raw_sql_paginated(self, params={}):
        self.total = self.get_total_from_raw_sql(params)
        self.last_page = math.ceil(self.total / self.per_page)

        return self.raw_sql_page(params)

    def get_total_from_raw_sql(self, params={}):
        cursor = connection.cursor()
        sql = f"""
        SELECT COUNT(*) AS total_records
        FROM (
                {self.queryset}
            ) AS subquery;
        """
        cursor.execute(sql, params)
        return helpers.dictfetchall(cursor)[0]["total_records"]

    def raw_sql_page(self, params={}):
        offset = (self.page - 1) * self.per_page
        cursor = connection.cursor()
        sql = f"""
            {self.queryset} LIMIT %(limit)s OFFSET %(offset)s;
        """

        cursor.execute(sql, {"limit": self.per_page, "offset": offset, **params})
        return helpers.dictfetchall(cursor)

    def get_paginated_response(self):
        has_next_page = self.page < self.last_page
        has_previous_page = self.page != 1
        return {
            "list": self.data,
            "page_info": {
                "page": self.page,
                "per_page": self.per_page,
                "last_page": self.last_page,
                "total": self.total,
                "has_next_page": has_next_page,
                "has_previous_page": has_previous_page,
            },
        }
