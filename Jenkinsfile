pipeline {
  agent any
  stages {
    stage('fe') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

  }
}