// Required modules for Liri
require('dotenv').config();

const fs = require('fs');
const request = require('request');
const moment = require('moment');
const keys = require('./keys');
const Spotify = require('node-spotify-api');

// Command is assigned the 2nd index from terminal
var command = process.argv[2];
var searchValue = "";

// searchValue is placed into one string
for (var i = 3; i < process.argv.length; i++) {
  searchValue += process.argv[i] + " ";
};

// switch case is based on the search term passed
switch (command) {
  case "concert-this":
    searchConcert(searchValue);
    break;

  case "spotify-this-song":
    searchSong(searchValue);
    break;

  case "movie-this":
    searchMovie(searchValue);
    break;

  case "do-what-it-says":
    randomSearch();
    break;

  default:
    console.log("\nYour command was not recognized. Please try one of the following commands.\n");
    console.log("1. Upcoming concerts: node liri.js concert-this *Name of artist*\n ex. node liri.js concert-this .\n");
    console.log("2. Songs: node liri.js spotify-this-song *number of results* *song title*\n ex. node liri.js spotify-this-song 3 I'm Alright.\n");
    console.log("3. Movie title: node liri.js movie-this *movie title*\n ex. node liri.js movie-this Braveheart.\n");
    console.log("4. Random search: node liri.js do-what-it-says.\n");
};




