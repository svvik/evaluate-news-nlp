# Project Instructions

## Project description
This project does setiment analysis of the web site provided by the user in the input form. Result of processing contains the following information:
- Agreement
- Confidence 
- Subjectivity
- Irony
- Score
Analysis is done by [meaningcloud](https://meaningcloud.com/) service.

## Project setup
This project uses `npm` as a depenedncy manager and `webpack` as a module bundler. 
Follow the following steps for the installation instructions:
1. `npm i --legacy-peer-deps`
1. create `.env` file from `.env.template` and provide valid `API_KEY` to access `meaningcloud`

## Running project
Project consists of 2 parts:
- client
- server

### Development mode
Follow the steps to run in development:
- `npm run start`
- `npm run build-dev`

### Production mode
Follow the steps to run in production:
- `npm run build-prod`
- `npm run start`
- Application is running on port 8000, therefore open the following url `http://localhost:8080/`. If your application is deployed or running on another host, then use appropriate DNS name to access it.

## Testing
`jest` is used as a framework to build tests. Run `npm run test` to execute all tests.
