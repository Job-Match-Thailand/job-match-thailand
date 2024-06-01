!/bin/sh

SUPERUSER_MOBILE=${DJANGO_SUPERUSER_MOBILE:-"0924155433"}

python3 manage.py collectstatic --noinput
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput
python3 manage.py createsuperuser --mobile $SUPERUSER_MOBILE --noinput || true
