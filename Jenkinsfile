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

        stage('Test') {
            steps {
                sh 'dotnet test'
            }
        }
    }
}