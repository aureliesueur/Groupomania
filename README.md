# Groupomania
Groupomania Social Network : frontend and backend project.

PREREQUISITES

This project uses NodeJs 14.15.3, Express 4.17.1 and MySQL 5.7.10 for the backend, and @vue/cli 4.5.9 for the frontend. You will need to have Node, MySQL and Vue CLI installed locally on your machine.

INSTALLATION

Please clone this repository : it will provide you with the two necessary folders : backend and frontend.

ACCESS TO THE DATABASE

This app uses the plugin dotenv to mask the connexion data. In this folder, you'll find a ".env-evaluator" file, which will provide you access to MySQL groupomania database, once filled with right values. To make it work, please change its name to ".env", and fill up the values with DB_USER and DB_PASS provided separately. 

Also, you need to locally create the database.
In the "backend/db" folder that you've have cloned, please type : mysql -u "DB_USER" -p. Then password = "DB_PASS" (of course replace "DB_USER" and "DB_PASS" by the correct datas). And finally : USE groupomania. 
Then you need to copy the whole content of "db.sql" file (in "backend/db" folder). Your groupomania database is created.

RUN THE APP

You will need two terminal windows : one for frontend, one for backend. On frontend terminal : run "npm run serve". The app's frontend is visible on http://localhost:8080/. On backend terminal : run "npm install" (ou "sudo npm install" sur Mac) puis "node server" ou "nodemon server.js". The server should run on localhost with default port 3000.
