pipeline {
  agent any

  environment {
    REGISTRY = "docker.io"
    DOCKERHUB_CREDENTIALS = "dockerhub-bossodiz"
    IMAGE_NAME = "bossodiz/grooming-web"
    STACK_DIR = "/apps/stack"
    // URL ของ API ที่ frontend จะเรียกตอน build image
    API_BASE_URL = "http://localhost:8080"   // หรือ "http://api:8080" ถ้าใช้ผ่าน docker network
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Init Vars') {
      steps {
        script {
          // บางครั้ง checkout เป็น detached HEAD → หาชื่อ branch จริง
          env.BRANCH_NAME = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD || echo main').trim()
          if (env.BRANCH_NAME == 'HEAD' || !env.BRANCH_NAME) {
            env.BRANCH_NAME = sh(returnStdout: true, script: 'git branch -r --contains HEAD | head -n1 | sed "s#origin/##"').trim()
            if (!env.BRANCH_NAME) { env.BRANCH_NAME = "main" }
          }
          env.SHORT_SHA   = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          env.BRANCH_SAFE = env.BRANCH_NAME.replaceAll(/[^A-Za-z0-9._-]/, '-')
          env.TAG         = "${env.BRANCH_SAFE}-${env.SHORT_SHA}"
          echo "BRANCH_NAME=${env.BRANCH_NAME}, TAG=${env.TAG}"
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build --build-arg API_BASE_URL=${API_BASE_URL} -t ${IMAGE_NAME}:${TAG} .
          if [ "${BRANCH_NAME}" = "main" ] || [ "${BRANCH_NAME}" = "master" ]; then
            docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest
          fi
        '''
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin ${REGISTRY}
            docker push ${IMAGE_NAME}:${TAG}
            if [ "${BRANCH_NAME}" = "main" ] || [ "${BRANCH_NAME}" = "master" ]; then
              docker push ${IMAGE_NAME}:latest
            fi
            docker logout ${REGISTRY}
          '''
        }
      }
    }

    stage('Deploy (docker compose up)') {
      when { anyOf { branch 'main'; branch 'master' } }
      steps {
        sh '''
          mkdir -p ${STACK_DIR}
          touch ${STACK_DIR}/.env

          # update WEB_TAG
          if grep -q '^WEB_TAG=' ${STACK_DIR}/.env; then
            sed -i 's/^WEB_TAG=.*/WEB_TAG='${TAG}'/' ${STACK_DIR}/.env
          else
            echo "WEB_TAG=${TAG}" >> ${STACK_DIR}/.env
          fi

          # ensure defaults
          grep -q '^API_TAG=' ${STACK_DIR}/.env       || echo "API_TAG=latest" >> ${STACK_DIR}/.env
          grep -q '^MYSQL_ROOT_PASSWORD=' ${STACK_DIR}/.env || echo "MYSQL_ROOT_PASSWORD=change-me" >> ${STACK_DIR}/.env
          grep -q '^MYSQL_DATABASE=' ${STACK_DIR}/.env || echo "MYSQL_DATABASE=grooming" >> ${STACK_DIR}/.env
          grep -q '^MYSQL_USER=' ${STACK_DIR}/.env     || echo "MYSQL_USER=grooming" >> ${STACK_DIR}/.env
          grep -q '^MYSQL_PASSWORD=' ${STACK_DIR}/.env || echo "MYSQL_PASSWORD=change-me" >> ${STACK_DIR}/.env
          grep -q '^JWT_SECRET=' ${STACK_DIR}/.env     || echo "JWT_SECRET=please-change-me" >> ${STACK_DIR}/.env

          cd ${STACK_DIR}
          docker compose pull web || true
          docker compose up -d web
        '''
      }
    }
  }

  post {
    always {
      script { deleteDir() } // แทน cleanWs ลดปัญหา context
    }
  }
}
