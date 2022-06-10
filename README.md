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
3. Open two terminal sessions (bash on MacOS or Linux, cmd or powershell or whatever on Windows) (I actually use the https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) at the root of this project.
4. With first terminal session (this one will be our backend):
    1. Use Yarn to install our dependencies via the command **yarn install**
    2. Start up our Node & Express server via the command **yarn start**. If in development, it should be opened on localhost PORT 3001. The server will stay open & active in this terminal session.
    3. (optional): check to see if it works by going to `localhost:3001` in your browser of choice. You should see something like "welcome to Express!"
5. With second terminal session (this one will be our frontend):
    1. Assuming you're at the project root, navigate to the Client side of the application by entering command `cd client-side/`
    2. Use Yarn to install our dependencies via the command **yarn install**
    3. Start up our Create React App bootstrapped frontend via the command **yarn start**. This usually takes a minute to start up. Keep this terminal/window/session alive once it starts.
       1. Note: can also do this with `yarn start-ui` if you're at the project root / working on the backend
    4. A new browser tab in your default browser will probably be opened on `localhost:3000` but you can open a new tab in your browser and go there as well.
    5. (optional): you can verify you're looking at the right thing by:
       1.  We should see a spinny React logo and a message that says "Edit src/App.js and save to reload." on a dark background.
       2.  Scroll down; you should see a blank background with some text at the very bottom that says Users, then "MyFirstUser" and "coolguy32".

