pipeline {
  agent none
  stages {
    stage('build') {
      agent {
        docker {
          image 'trion/ng-cli'
        }

      }
      steps {
        sh 'npm install'
      }
    }

  }
}