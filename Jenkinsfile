pipeline {
  agent any

  environment {
    REGISTRY = "docker.io"
    DOCKERHUB_CREDENTIALS = "dockerhub-bossodiz"
    IMAGE_NAME = "bossodiz/grooming-web"
    SHORT_SHA = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
    BRANCH_SAFE = env.BRANCH_NAME.replaceAll('[^A-Za-z0-9._-]','-')
    TAG = "${BRANCH_SAFE}-${SHORT_SHA}"
    STACK_DIR = "/apps/stack"
    # URL ของ API ที่ frontend จะเรียก (ตอน build image)
    API_BASE_URL = "http://localhost:8080"
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Angular') {
      steps {
        sh """
          docker run --rm -v "\$PWD":/app -w /app node:20 \
            bash -lc "npm ci && npx ng version && npx ng build --configuration production"
        """
      }
    }

    stage('Build Docker Image') {
      steps {
        sh """
          docker build --build-arg API_BASE_URL=${API_BASE_URL} -t ${IMAGE_NAME}:${TAG} .
          if [ "${BRANCH_NAME}" = "main" ] || [ "${BRANCH_NAME}" = "master" ]; then
            docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest
          fi
        """
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin ${REGISTRY}
            docker push ${IMAGE_NAME}:${TAG}
            if [ "${BRANCH_NAME}" = "main" ] || [ "${BRANCH_NAME}" = "master" ]; then
              docker push ${IMAGE_NAME}:latest
            fi
            docker logout ${REGISTRY}
          """
        }
      }
    }

    stage('Deploy (docker compose up)') {
      when { anyOf { branch 'main'; branch 'master'; } }
      steps {
        sh """
          mkdir -p ${STACK_DIR}
          touch ${STACK_DIR}/.env

          # อัปเดต WEB_TAG ให้เป็น tag ล่าสุด
          grep -q '^WEB_TAG=' ${STACK_DIR}/.env && \
            sed -i 's/^WEB_TAG=.*/WEB_TAG=${TAG}/' ${STACK_DIR}/.env || \
            echo "WEB_TAG=${TAG}" >> ${STACK_DIR}/.env

          cd ${STACK_DIR}
          docker compose pull web || true
          docker compose up -d web
        """
      }
    }
  }

  post {
    always { cleanWs() }
  }
}
