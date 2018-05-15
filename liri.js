// read and set any environment variables with the dotenv package
require("dotenv").config();

// setting variable for command user inputs
var command = process.argv[2]

// setting variable for movie title or song title user inputs
var inputText = process.argv.slice(3).join(" ")

// asking node to read keys.js file
var keys = require("./keys.js");

// calling the twitter npm package
var Twitter = require('twitter');

// calling the spotify npm package
var Spotify = require('node-spotify-api');

// calling the request npm package to use with OMDB
var request = require('request');

// setting the twitter keys using keys.js file
var clientTwitter = new Twitter({
  consumer_key: (keys.twitter.consumer_key),
  consumer_secret: (keys.twitter.consumer_secret),
  access_token_key: (keys.twitter.access_token_key),
  access_token_secret: (keys.twitter.access_token_secret),
});

// setting the twitter keys using keys.js file
var clientSpotify = new Spotify({
  id: (keys.spotify.id),
  secret: (keys.spotify.secret),
});

// Switch-case will direct which function gets run
switch (command) {
case "my-tweets":
  tweetsRun();
  break;

case "spotify-this-song":
  songRun();
  break;

case "movie-this":
  movieRun();
  break;
}

// If the "my-tweets" function is called...
function tweets() {

  //   // twitter response to get 20 most recent tweets from user (me)
    clientTwitter.get('favorites/list', function(error, tweets, response) {
      if(error) throw error;
      console.log(tweets);  // The favorites.
      //console.log("Tweet: " + JSON.parse(response).created_at);
      });
}

// If the "spotify-this-song" function is called...
function songRun() {

  // spotify call that returns song info
  clientSpotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log(data);
    });
}

// If the "movie-this" function is called...
function movieRun() {

  if (inputText === "") {
    // OMDB response with movie information based on what movie user inputs
    request("http://www.omdbapi.com/?t=mr-nobody&y=&plot=short&apikey=b0f89c15", function(error, response, body) {

      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

      }
    });
  }

  else {
    // OMDB response with movie information based on what movie user inputs
    request("http://www.omdbapi.com/?t=" + inputText + "&y=&plot=short&apikey=b0f89c15", function(error, response, body) {

      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

      }
    });
  }
}


if (command != "my-tweets" || "spotify-this-song" || "movie-this") {
  console.log("That is not a recognized command. Please try again!")
}
