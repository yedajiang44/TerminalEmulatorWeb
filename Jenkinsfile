pipeline {
    agent {
        label 'docker' 
    }
    stages {
        stage('checkout') {
            agent {
                docker {
                  // Set both label and image
                  label 'docker'
                  image 'node:7-alpine'
                  args '--name docker-node' // list any args
                }
            }
            steps {
                git 'http://git.yedajiang44.com/yedajiang44/TerminalEmulatorWeb.git'
            }
        }
    }
}