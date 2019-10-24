# Spotify Visualizer
This is a simple Spotify app that displays the currently playing track on the home screen along with the album cover, 
over a colorful background. Built with Node.js, Javascript, HTML & Javascript.  Uses Express.js, Passport.js, and ejs.

## Project Status

This project currently works as intended but I plan to continue developing it with more features, as well as update the 
look and feel of the app to be more visually appealing.

## Video Walkthrough

<img src='https://i.imgur.com/b15st56.gif' width='' alt='Video Walkthrough' />


## Installation and Setup Instructions

Clone this repository.  You will need node and npm installed locally.

Setup:  

Create a new Client ID through Spotify Developer:
https://developer.spotify.com/dashboard/applications.

Under config, in keys.js, edit code to include client secret and client ID:

```javascript
module.exports = {
  spotify: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
  },
```
  
Create a Cluster through Mongo:
https://www.mongodb.com/

Click 'connect' once you've created cluster, enter your DB_URI (with username and password) in the keys.js file:

```javascript
  mongodb: {
    dbURI: 'DB_URI'
  },
```

Create a cookie key in file:

```
  session: {
    cookieKey: 'COOKIE_KEY'
  }
  ```
  

Installation:

`npm install`  

To start server:
`node app`

To visit app:
`localhost:8888`  


## Reflection

I built this project to get started coding in javascript.  I wanted to create a visual app, and I'm a huge fan of Spotify, 
so I decided to create a visualizer for what I was currently playing on Spotify.  The biggest challenge was authentication, 
which required me to do a lot of reading to understand what was happening on the backend when I logged in to my Spotify 
account with a 3rd-party app.  

Through the process of creating this app, I decided to use Passport.js to authenticate users, express.js for the framework
of the website, and EJS to conveniently pass information from javascript code to my views.  I found that express.js is the 
most popular web framework and I would like to continue to gain experience with this framework in the future.

Credit to node-vibrant, used for color extraction for album covers:
https://github.com/akfish/node-vibrant/
