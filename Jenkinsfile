pipeline {
    agent any

    environment {
        DOTNET_ROOT = "/root/.dotnet"
        PATH = "${env.PATH}:${DOTNET_ROOT}"
    }
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