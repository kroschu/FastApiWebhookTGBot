FROM docker.io/python:3.11

RUN apt update -y \
    && apt install -y python3 python3-pip

COPY . /app

WORKDIR /app

RUN python3 -m pip install -r requirements.txt
RUN alembic upgrade head

EXPOSE 5050

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5050"]