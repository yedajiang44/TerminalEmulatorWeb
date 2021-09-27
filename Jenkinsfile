pipeline {
  agent none
  stages {
    stage('build') {
      agent {
        docker {
          image 'node:16-alpine3.11'
        }

      }
      steps {
        sh 'npm install'
      }
    }

  }
}