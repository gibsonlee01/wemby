# 기본 이미지를 nginx로 선택합니다.
FROM nginx:latest

# Nginx 설정 파일을 복사합니다.
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Nginx 설정 디렉토리를 생성합니다.
RUN mkdir -p /etc/nginx/sites-available
RUN mkdir -p /etc/nginx/sites-enabled

# 앞서 정의한 reverse_proxy.conf를 복사하여 설정 파일을 생성합니다.
COPY nginx/reverse_proxy.conf /etc/nginx/sites-available/

# 심볼릭 링크를 통해 sites-available에 있는 설정 파일을 sites-enabled로 연결합니다.
RUN ln -s /etc/nginx/sites-available/reverse_proxy.conf /etc/nginx/sites-enabled/

# Nginx의 기본 설정 파일을 제거합니다.
RUN rm /etc/nginx/conf.d/default.conf

# 컨테이너 실행 시 Nginx를 시작합니다.
CMD ["nginx", "-g", "daemon off;"]
