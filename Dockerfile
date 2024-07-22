# 베이스 이미지 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 설치를 위해 package.json 및 package-lock.json 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 어플리케이션 코드 복사
COPY . .

# 어플리케이션이 실행될 포트 설정
EXPOSE 3000

# 서버 실행
CMD ["node", "server.js"]

