require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: (keys.twitter.consumer_key),
  consumer_secret: (keys.twitter.consumer_secret),
  access_token_key: (keys.twitter.access_token_key),
  access_token_secret: (keys.twitter.access_token_secret),
});

client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});
