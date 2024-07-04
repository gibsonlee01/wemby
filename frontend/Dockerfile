# Node.js 이미지 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app/frontend/

# 필요한 패키지 설치
COPY frontend/package.json /app/frontend/
RUN npm install

# 소스 코드 복사
COPY frontend/ /app/frontend/

# Expose the port
EXPOSE 3000

# 컨테이너 실행 명령
CMD ["npm", "start"]