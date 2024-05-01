# pull official base image
FROM python:3.10.12-alpine

COPY . /app
WORKDIR /app

RUN python3 -m venv /opt/venv

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2
RUN apk update \
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  && apk add --update --no-cache postgresql-client jpeg-dev libffi-dev \
  && apk add cairo-dev pango-dev gdk-pixbuf-dev fontconfig font-noto-thai \
  && apk add --update --no-cache --virtual .tmp-build-deps \
  && apk add gcc libc-dev linux-headers postgresql-dev musl-dev zlib \
  && apk add zlib-dev fontconfig font-noto-thai ttf-dejavu \
  && apk --update add fontconfig ttf-dejavu \
  && pip install psycopg2 \
  && apk del build-deps \
  && apk del .tmp-build-deps

# install dependencies
RUN pip install --upgrade pip
RUN /opt/venv/bin/pip install -r requirements.txt
RUN chmod +x entrypoint.sh

CMD ["/app/entrypoint.sh"]