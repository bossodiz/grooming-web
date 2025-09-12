pipeline {
  agent any
  options { ansiColor('xterm'); timestamps() }

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to deploy')
    string(name: 'DEPLOY_HOST', defaultValue: 'YOUR.SERVER.IP', description: 'Deploy server IP/host')
    string(name: 'DEPLOY_PATH', defaultValue: '/home/ubuntu/apps/grooming-web', description: 'Remote path on server')
    string(name: 'API_STACK_PREFIX', defaultValue: 'bbp_api_main', description: 'API stack prefix (เช่น bbp_api_main, bbp_api_featureX)')
    credentials(name: 'SSH_CRED', defaultValue: 'ssh-key-credentials-id', description: 'SSH key cred id', credentialType: 'com.cloudbees.plugins.credentials.impl.BaseStandardCredentials')
  }

  environment {
    REPO_URL = 'https://github.com/bossodiz/grooming-web.git'
    PROJECT  = "bbp_web_${params.BRANCH}"   // ใช้ prefix bbp
  }

  stages {
    stage('Git Clone') {
      steps {
        sshagent (credentials: [params.SSH_CRED]) {
          sh """
            ssh ubuntu@${params.DEPLOY_HOST} '
              set -e
              mkdir -p ${params.DEPLOY_PATH}
              if [ -d ${params.DEPLOY_PATH}/.git ]; then
                cd ${params.DEPLOY_PATH}
                git fetch --all
              else
                git clone ${REPO_URL} ${params.DEPLOY_PATH}
                cd ${params.DEPLOY_PATH}
              fi
              git checkout ${params.BRANCH}
              git reset --hard origin/${params.BRANCH}
            '
          """
        }
      }
    }

    stage('Build') {
      steps {
        sshagent (credentials: [params.SSH_CRED]) {
          sh """
            ssh ubuntu@${params.DEPLOY_HOST} '
              set -e
              cd ${params.DEPLOY_PATH}
              docker compose -p ${PROJECT} build
            '
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent (credentials: [params.SSH_CRED]) {
          sh """
            ssh ubuntu@${params.DEPLOY_HOST} '
              set -e
              cd ${params.DEPLOY_PATH}

              cat > .env <<EOF
              STACK_PREFIX=${PROJECT}
              API_BASE_URL=http://${params.API_STACK_PREFIX}_api:8080
              EOF

              docker network create appnet || true
              docker compose -p ${PROJECT} up -d
            '
          """
        }
      }
    }
  }
}
