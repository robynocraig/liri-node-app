// read and set any environment variables with the dotenv package
require("dotenv").config();

// setting variable for command user inputs
var command = process.argv[2]

// asking node to read keys.js file
var keys = require("./keys.js");

// calling the twitter npm package
var Twitter = require('twitter');

// setting the twitter keys using keys.js file
var clientTwitter = new Twitter({
  consumer_key: (keys.twitter.consumer_key),
  consumer_secret: (keys.twitter.consumer_secret),
  access_token_key: (keys.twitter.access_token_key),
  access_token_secret: (keys.twitter.access_token_secret),
});

// calling the spotify npm package
var Spotify = require('node-spotify-api');

// setting the twitter keys using keys.js file
var clientSpotify = new Spotify({
  id: (keys.spotify.id),
  secret: (keys.spotify.secret),
});

  // logic for what command is typed

  if (command === "my-tweets") {

  // twitter response to get 20 most recent tweets from user (me)
  clientTwitter.get('favorites/list', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    //console.log("Tweet: " + JSON.parse(response).created_at);
    });
  }

  else if (command === "spotify-this-song") {

    clientSpotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log(data);
    });
  }

  else if (command === "movie-this") {

  // OMDB response with movie information based on what movie user inputs

  }

  else if (command === "do-what-it-says") {

  // OMDB response with movie information based on what movie user inputs

  }

  else {
  console.log("That is not a recognized command. Please try again!")
  }
