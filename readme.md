# 🌟 한글명언 OPEN API 기술설명서

본 문서는 한글명언 OPEN API 프로젝트의 전반적인 시스템 구성, 사용 기술(버전 포함), 모듈별 역할, 실행 방법, 배포 환경, 관련 링크 정보 및 CI/CD 파이프라인 설정에 관한 설명서입니다.

---

## 1. 개요

api key나 복잡한 인증 필요없이 한글로 번역한 명언을 받아볼 수 있는 OPEN API 서비스 구현

---

## 2. 관련 링크 📑

아래는 프로젝트와 관련된 다양한 링크 정보입니다.

- **API 문서**: [https://quote.aleph.kr/api-docs/](https://quote.aleph.kr/api-docs/)  
  (API 문서 페이지)
- **관리자 페이지**: [https://quote.aleph.kr/admin](https://quote.aleph.kr/admin)  
  (관리자 전용 명언 관리 페이지)
- **깃허브**: [https://github.com/Aleph-Kim/korean-quote](https://github.com/Aleph-Kim/korean-quote)  
  (프로젝트 소스 코드 페이지)

---

## 3. 시스템 아키텍처 🏗️

### 3.1. 시스템 구성

**[클라이언트 (프론트엔드)]**  
• EJS 템플릿 엔진: 동적 HTML 페이지 렌더링  
• Tailwind CSS: 빠르고 효율적인 UI 스타일링

**[서버 (백엔드)]**  
• Express.js: RESTful API 엔드포인트 제공  
• 미들웨어: 요청 파싱, 쿠키 및 세션 관리, CORS 설정 등

**[데이터베이스]**  
• PostgreSQL: 명언 데이터를 저장  
• Sequelize ORM: 데이터베이스와의 객체 지향적 인터랙션

**[배포 및 인프라]**  
• Docker: 컨테이너 기반 배포 관리  
• Nginx Proxy Manager: 프록시 관리 및 SSL/TLS 인증서 발급  
• GCP (Google Cloud Platform): 클라우드 인프라 배포

### 3.2. 데이터 흐름 🔄

1. **요청 처리** – 클라이언트가 `/quote/random` 등 API 엔드포인트로 HTTP 요청을 전송합니다.  
2. **비즈니스 로직 처리** – Express 라우터에서 요청을 처리하며, 필요시 Sequelize를 이용해 데이터베이스와 상호작용합니다.  
3. **응답 생성** – 조회된 데이터(랜덤 명언 등)를 JSON 형식 또는 EJS 템플릿을 통해 HTML로 응답합니다.  
4. **에러 처리** – 에러 발생 시 적절한 상태 코드와 메시지로 클라이언트에 응답합니다.

---

## 4. 사용 기술 및 버전 🛠️

### 4.1. 백엔드
- **Express.js** – Node.js 기반 웹 프레임워크, 버전: `^4.19.2`  
- **EJS** – 서버 사이드 템플릿 엔진, 버전: `^3.1.10`  
- **body-parser** – HTTP 요청 데이터 파싱, 버전: `1.20.2`  
- **cookie-parser** – 쿠키 파싱 미들웨어, 버전: `^1.4.7`  
- **express-session** – 세션 관리, 버전: `^1.18.1`  
- **express-validator** – 요청 데이터 유효성 검증, 버전: `^7.2.1`  
- **multer** – 파일 업로드 처리, 버전: `^1.4.5-lts.1`  
- **cors** – CORS 설정, 버전: `^2.8.5`

### 4.2. 데이터베이스
- **PostgreSQL** – 관계형 데이터베이스 시스템, 버전: `^16.4`
- **Sequelize** – ORM (Object Relational Mapping) 라이브러리, 버전: `^6.37.3`

### 4.3. 기타 도구
- **dotenv** – 환경 변수 관리, 버전: `^16.4.5`  
- **apidoc** – API 문서 자동 생성 도구, 버전: `^1.2.0`  
- **Tailwind CSS** – 유틸리티 클래스 기반 CSS 프레임워크, 버전: `^3.4.17`  
- **PostCSS** – CSS 전처리 도구, 버전: `^8.5.1`  
- **Autoprefixer** – 자동 벤더 프리픽스 추가 도구, 버전: `^10.4.20`  
- **nodemon** – 파일 변경 시 자동 서버 재시작 도구, 버전: `^3.1.4`

### 4.4. 배포 및 인프라 관련 도구
- **Docker** – 컨테이너 기반 배포 관리 도구, 버전: `^26.1.4`  
- **Nginx Proxy Manager** – 프록시 관리 및 SSL/TLS 인증서 발급 도구, 버전: `^2.11.3`  
- **GCP (Google Cloud Platform)** – 클라우드 인프라 서비스

---

## 5. 모듈 구성 및 주요 기능 📦

### 5.1. 서버 엔트리 포인트
- 파일: `src/app.js`  
- 역할: Express 애플리케이션 인스턴스 생성, 미들웨어 설정( body-parser, cookie-parser, cors, session 등 ), 라우터 및 API 엔드포인트 연결, 에러 핸들링 미들웨어 설정, 서버 포트 리스닝 시작

### 5.2. 라우터 모듈
- 경로: `src/routes/`
- 주요 기능:  
  • 랜덤 명언 조회 API: `GET /quote/random`
  • 오늘의 명언 조회 API: `GET /quote/today`
  • 관리자페이지: `GET /admin`

### 5.3. 데이터베이스 모델
- Sequelize 모델:  
  • **Quote 모델** – 속성: `id`, `body` (명언 내용), `author` (남긴이), `createdAt`, `updatedAt` 등  
  • 모델 간 관계 및 데이터 유효성 검증 설정

### 5.4. 뷰 템플릿
- EJS 템플릿  
  • 경로: `views/`  
  • 동적 HTML 렌더링을 통해 명언 데이터를 사용자에게 제공

---

## 6. 빌드 및 실행 환경 🚀

### 6.1. 의존성 설치
터미널에서 `npm install` 명령을 실행하여 의존성 패키지를 설치합니다.

### 6.2. 환경 변수 설정
프로젝트 루트에 **.env** 파일을 생성하고, 다음과 같이 설정합니다:

```env
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/database_name
SESSION_SECRET=your_secret_key
```

### 6.3. 실행 명령어
- 개발 모드 실행 (nodemon 사용): `npm run dev`  
- 프로덕션 모드 실행: `npm start`  
- Tailwind CSS 빌드 (실시간 감시): `npm run css`  
- Tailwind CSS 정적 빌드: `npm run build:css`  
- API 문서 생성 (apidoc 사용): `npm run api`

---

## 7. 배포 및 인프라 설정 ☁️

### 7.1. Docker 기반 배포

#### Docker Compose 파일 (docker-compose.yml)
```yml
version: '3.8'

services:
  prod:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
  
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

**주요 내용**  
- **버전**: Compose 파일 버전 3.8 사용  
- **services**: prod와 dev 두 가지 서비스로 구성  
  - **prod 서비스**:  
    - 현재 디렉토리를 빌드 컨텍스트로 사용하며, `Dockerfile.prod`를 사용하여 이미지를 빌드  
    - 포트 3000을 호스트와 컨테이너 간 매핑  
    - 소스코드와 node_modules 디렉토리를 볼륨으로 연결하여 실시간 동기화  
    - NODE_ENV 환경 변수를 development로 설정  
  - **dev 서비스**: prod와 동일한 방식으로 설정하지만, 별도의 `Dockerfile.dev`를 사용하여 개발 환경에 맞는 설정 가능

#### Dockerfile.prod
```Dockerfile
# 베이스 이미지 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치를 위해 package.json 및 package-lock.json 복사
COPY package*.json ./

# 패키지 설치 (production 모드)
RUN npm install --production

# 어플리케이션 코드 복사
COPY . .

# Tailwind CSS 빌드
RUN npm run build:css

# 어플리케이션이 실행될 포트 설정
EXPOSE 3000

# 서버 실행
CMD [ "npm", "run", "start" ]
```

**주요 내용**  
- **베이스 이미지**: node:20 사용  
- **작업 디렉토리**: `/app`으로 설정  
- **패키지 설치**: package.json 및 package-lock.json 파일을 복사 후, production 모드로 의존성 설치  
- **코드 복사**: 전체 소스 코드를 컨테이너 내 `/app` 디렉토리로 복사  
- **Tailwind CSS 빌드**: `npm run build:css`를 통해 CSS 빌드 수행  
- **포트 노출**: 3000번 포트를 외부에 노출  
- **실행 명령어**: `npm run start`로 서버 실행

### 7.2. Nginx Proxy Manager 설정
- **역할**: 도메인 프록시 설정, SSL 인증서 관리, Docker 컨테이너로 배포된 API 서버 접근 제어  
- **설정 예시**: API 서버 내부 주소(예: `http://localhost:3000`)를 프록시 대상으로 등록하고, HTTPS 및 필요한 포트 포워딩 설정

### 7.3. GCP 배포
- **활용 방법**: Compute Engine, Kubernetes Engine 또는 Cloud Run을 통해 컨테이너 기반 애플리케이션 배포  
- Docker 이미지를 빌드 후 GCP Container Registry 또는 Artifact Registry에 업로드, 배포 진행  
- Nginx Proxy Manager와 연동하여 도메인 관리 및 SSL 인증서 적용  

---

## 8. 에러 처리 및 로깅 🔍

### 8.1. 에러 처리
- **400 Bad Request** – 요청 데이터가 올바르지 않을 경우, 상태 코드 400과 에러 메시지 반환  
- **404 Not Found** – 존재하지 않는 엔드포인트 접근 시, 상태 코드 404와 에러 메시지 반환  
- **500 Internal Server Error** – 서버 내부 오류 발생 시, 상태 코드 500과 에러 메시지 반환 및 로깅을 통해 원인 분석

### 8.2. 로깅
- 서버 로그는 콘솔 출력 및 필요에 따라 파일로 저장  
- 에러 발생 시 스택 트레이스를 함께 기록하여 디버깅에 활용

---

## 9. 보안 고려 사항 🔒

- **환경 변수 관리**: 민감한 정보는 **.env** 파일로 관리하고, 버전 관리 시스템에서 제외(`.gitignore` 설정)  
- **세션 관리**: `express-session`을 사용하여 세션을 안전하게 관리하며, `SESSION_SECRET`은 반드시 안전한 값으로 설정  
- **CORS 정책**: 허용된 도메인만 접근하도록 CORS 미들웨어 설정  
- **데이터 유효성 검증**: `express-validator`를 통해 입력 데이터 검증을 수행하여 SQL Injection 및 XSS 공격 대비

---

## 10. CI/CD Pipeline (GitHub Actions) 🚀

프로젝트는 GitHub Actions를 활용하여 CI/CD 파이프라인을 구축하고 있습니다.  
파이프라인은 master 브랜치에 대한 push 또는 pull request 이벤트 발생 시 실행되며, Docker 이미지를 빌드하여 Docker Hub에 업로드 후, SSH를 통해 원격 서버에 배포합니다.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker image
        run: |
          docker build . -f Dockerfile.prod -t ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:${{ github.sha }}
          docker tag ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:${{ github.sha }} ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:latest

      - name: Push Docker image to Docker Hub
        run: |
          docker push ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:${{ github.sha }}
          docker push ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:latest

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            sudo docker pull ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:latest
            sudo docker stop ${{ secrets.PROJECT_NAME }} || true
            sudo docker rm ${{ secrets.PROJECT_NAME }} || true
            sudo docker run -d -p 3000:3000 --name ${{ secrets.PROJECT_NAME }} --env-file ${{ secrets.ENV_PATH }} ${{ secrets.DOCKER_USERNAME }}/${{ secrets.PROJECT_NAME }}:latest
```

### 주요 내용

- **트리거**: push 및 pull_request 이벤트가 master 브랜치에서 발생하면 파이프라인 실행
- **빌드 단계**: Repository 체크아웃, Docker Buildx 설정, Docker Hub 로그인, Dockerfile.prod를 사용한 이미지 빌드 및 태그 생성, Docker Hub로 이미지 업로드
- **배포 단계**: 빌드 완료 후 SSH로 원격 서버 접속, 최신 이미지 pull, 기존 컨테이너 중지 및 삭제 후 새 컨테이너 실행 (포트 3000 매핑 및 환경 변수 파일 적용)

---

## 11. 마무리 🎉

추가 문의나 개선 요청이 있으시면 언제든지 연락 부탁드립니다.

개발자 이메일 : dktjdej@naver.com

감사합니다! 😊
