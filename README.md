# Live Chat App

A live chat app personal project of Perry's to familiarize himself with Node & Express while solidifying his React & TS frontend skills.

## Architectural Design

* Top-level: a Node & Express based REST API that wraps the client side app
* Inner-level: inside the `/client-side` directory of this app is a Create React App that makes use of Material UI components
* Language choice: TypeScript across the entire stack
* Module system: ESModules across the entire stack (required a lot of config in the backend since the backend had to be ported from the older Nodejs standard of CommonJS)

## Setup

1. Git clone this repo
2. Make sure you have Node.js, NPM, and Yarn installed on your local machine & accessible in any arbitrary location (e.g. needs to be in your $PATH)
3. Open two terminal sessions (bash on MacOS or Linux, cmd or powershell or whatever on Windows) (I actually use the https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)
4. With first terminal session (this one will be our backend):
    1. Navigate to project root
    2. Use Yarn to install our dependencies via the command **yarn install**
    3. Start up our Node & Express server via the command **yarn start**
    4. Keep this terminal/window/session alive; just minimize or something for now
5. With second terminal session (this one will be our frontend):
    1. Navigate to the Client side of the application at ~/client-side
    2. Use Yarn to install our dependencies via the command **yarn install**
    3. Start up our Create React App bootstrapped frontend via the command **yarn start**
    4. Keep this terminal/window/session alive; just minimize or something for now
6. Open up your web browser of choice and navigate to the URL **localhost:3000**
    1. We should see a spinny React logo and a message that says "Edit src/App.js and save to reload." on a dark background.
    2. Scroll down; you should see a blank background with some text at the very bottom that says Users, then "MyFirstUser" and "coolguy32".

If you've successfully been able to make it through each step of the "Procedure to replicate", you're being served "MyFirstUser" and "coolguy32" from the Node & Express backend :)
