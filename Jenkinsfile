pipeline {
    agent { dockerfile true }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out sources..'
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the source'
                sh 'yarn build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests'
                sh 'yarn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Nothing to deploy yet'
            }
        }
    }
}