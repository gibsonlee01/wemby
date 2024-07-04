# Python 이미지 사용
FROM python:3.11
ENV PYTHONDONTWRITEBITECODE=1
ENV PYTHONUNBUFFED=1

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y binutils libproj-dev gdal-bin
RUN apt-get install -y libgl1-mesa-glx

# 작업 디렉토리 설정
WORKDIR /app/backend

# 필요한 패키지 설치
COPY backend/requirements.txt /app/backend/
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt

# 소스 코드 복사
COPY backend/ /app/backend/

# Expose the port
EXPOSE 8000

# 컨테이너 실행 명령
CMD ["python", "project/manage.py", "runserver", "0.0.0.0:8000"]