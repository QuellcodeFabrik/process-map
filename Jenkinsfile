pipeline {
    agent { dockerfile true }

    stages {
        stage('Prepare') {
            steps {
                echo 'Installing dependencies..'
                sh 'npm install'
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