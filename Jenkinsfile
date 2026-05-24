pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Dotnet Check') {
            steps {
                sh 'dotnet --version'
            }
        }
        stage('Restore') {
            steps {
                sh 'dotnet restore'
            }
        }
        stage('Build') {
            steps {
                sh 'dotnet build --no-restore --configuration Release'
            }
        }
        stage('Test') {
            steps {
                sh 'dotnet test --no-restore --no-build --configuration Release --verbosity normal'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo 'All tests passed.'
        }
        failure {
            echo 'Build or tests failed.'
        }
    }
}