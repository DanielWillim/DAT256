# Repository for Chalmes course DAT256 Software Engineering Project

A project investigating whether public transit ticket purchases can be encouraged by gamification. [Live demo](https://kirens.github.io/DAT256)

## Running the app

To run the app you will need a working version of NodeJs, [download here](https://nodejs.org/dist/v10.16.0/node-v10.16.0-x64.msi).
When you have a working version of NodeJs, run `npm ci` from the root of the project, followed by `npm start`.

## Structure of the app

The app consists of main file, `app.jsx`, which loads different commponents depending on the state of the app. 
In the folder `backend` all the code for database abstration can be found. 
