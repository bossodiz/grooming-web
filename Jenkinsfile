pipeline {
  agent any
  options { ansiColor('xterm'); timestamps() }

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to deploy')
  }

  environment {
    PROJECT  = "bbp_web"
  }

  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout([
          $class: 'GitSCM',
          branches: [[name: "*/${params.BRANCH}"]],
          userRemoteConfigs: [[
            url: 'https://github.com/bossodiz/grooming-web.git',
            credentialsId: 'github-pat'   // ใช้ credential PAT แบบเดียวกับ API
          ]]
        ])
      }
    }

    stage('Build Web') {
      steps {
        sh """
          docker network create appnet || true
          docker compose -p ${PROJECT} build web
        """
      }
    }

    stage('Deploy Web') {
      steps {
        sh """
          docker compose -p ${PROJECT} up -d --no-deps web
          docker compose -p ${PROJECT} ps
        """
      }
    }
  }

  post {
    success { echo "✅ Web deployed on project ${PROJECT}" }
    failure { echo "❌ Web deploy failed for branch ${params.BRANCH}" }
  }
}
