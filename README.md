# Disclaimer

This repository contains the materials provided to study participants for our S&P 2025 submission. 
It is not meant to be used for non research purposes. All data contained in this repository was 
auto-generated using faker, i.e., is not real.

# Project - Health App

Web Application

## Technologies / Frameworks

- HTML
- TypeScript
- Angular + Ionic
- Express
- Mysql
- Node

## Installation

Clone this project and open, for example, in VSCode.


## Run the Application
Install Docker and Docker-Compose

Run 
```
docker-compose build && docker-compose up -d
```
PhpMyAdmin runs on [localhost:3002](http://localhost:3002)


## Starting the Application
### Database
Start project-health-app container

### Backend
cd backend

Run
```
npm install # Added for review
DB_PORT=3001 DB_HOST=localhost DB_PASSWORD=root DB_USER=root MYSQL_DB=health-app node index.js # Adjusted for review
```
Backend runs on [localhost:3000](http://localhost:3000)

### Frontend
Added for review: You need to install angular, e.g., angular `14.2.6` or `15.2.6` to have access to the `ng` binary.

cd frontend

Run
```
ng serve
```
Frontend runs on, access Webpage with [localhost:4200](http://localhost:4200)

Added for review: In case you need to reinstall the npm dependencies, try running the following:
```sh
rm -rf node_modules && npm install --force
```

### Admin Account
Use user login interface to log into admin Account

Email: admin@admin.com

Password: admin123
