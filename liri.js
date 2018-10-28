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


// concert-this function
function searchConcert(searchValue) {
  let bands = keys.bands;

  // set default to "Lady Gaga" if no value is given
  if (searchValue == "") {
      searchValue = "Lady Gaga";
  }

  let queryUrl = "https://rest.bandsintown.com/artists/" + searchValue.trim() + "/events?app_id=" + bands + "&date=upcoming";

  request(queryUrl, function (err, response, body) {

      // results not found
      if (JSON.parse(body).Error == "Concerts not found for " + searchValue) {

          // display no results
          console.log("\nResults not found for " + searchValue + ". Please try another artist.\r\n")

      } else {

          let concertBody = JSON.parse(body);
          let dateFormat = 'dddd, MMMM Do YYYY [at] h:mm A';

          // display result information
          console.log("\n========== " + searchValue.toUpperCase() + " ==========\n");
          console.log("Artist Name: " + searchValue);
          console.log("Venue Name: " + concertBody[0].venue.name);
          console.log("Venue Location: " + concertBody[0].venue.city + ", " + concertBody[0].venue.region);
          console.log("Date of Event: " + moment(concertBody[0].datetime).format(dateFormat));
          console.log("\n================================\n");
      };
  });
};


// spotify-this-song function
function searchSong(searchValue) {

  // set default to "The Sign" if no value is given
  if (searchValue == "") {
    searchValue = "The Sign Ace of Base ";
  }

  // Access Spotify keys
  let spotify = new Spotify(keys.spotify);

  // reset to empty value
  var searchLimit = "";

  // This portion will allow the user to input the number of results to be returned
  if (isNaN(parseInt(process.argv[3])) == false) {
      searchLimit = process.argv[3];

      console.log("\nNumber of songs requested: " + searchLimit);

      // Resets the searchValue if search limit is empty
      searchValue = "";
      for (var i = 4; i < process.argv.length; i++) {
          searchValue += process.argv[i] + " ";
      };

  } else {
      // informs the user that they may input more than one result to be returned.
      console.log("\nAdd the number of results you would like returned after spotify-this-song.\nex. node.js spotify-this-song 4 I'm Alright");
      searchLimit = 1;
  }

  // search spotify with given values
  spotify.search({
    type: 'track',
    query: searchValue,
    limit: searchLimit
}, function (err, response) {

    let songResp = response.tracks.items;

    for (var i = 0; i < songResp.length; i++) {
      
      // show the results in the terminal
      console.log("\n=============== " + searchValue.toUpperCase() + "(" + `${(i + 1)}` + ")" + " ================\n");
      console.log(("Artist: " + songResp[i].artists[0].name));
      console.log(("Song title: " + songResp[i].name));
      console.log(("Album name: " + songResp[i].album.name));
      console.log(("Preview link: " + songResp[i].preview_url));
      console.log("\n================================\n");
    }
  })
};


// movie-this search function
function searchMovie(searchValue) {
  let omdb = keys.omdb;

  // set default to "Mr. Nobody" if no value is given
  if (searchValue == "") {
      searchValue = "Mr. Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + searchValue.trim() + "&y=&plot=short&apikey=" + omdb;

  request(queryUrl, function (err, response, body) {

      if (JSON.parse(body).Error == 'Movie not found!') {

          // no results is displayed to terminal
          console.log("\nNo results found for " + searchValue + ". Please search for another title.\n")

      } else {

          let movieBody = JSON.parse(body);

          // display the first portion of results
          console.log("\n========== " + searchValue.toUpperCase() + "==========\n");
          console.log("Movie Title: " + movieBody.Title);
          console.log("Year: " + movieBody.Year);
          console.log("IMDB rating: " + movieBody.imdbRating);


          // no Rotten Tomatoes Rating
          if (movieBody.Ratings.length < 2) {

              // display message to terminal
              console.log("No Rotten Tomatoes Rating for this movie.")

          } else {

              // show ratings
              console.log("Rotten Tomatoes Rating: " + movieBody.Ratings[1].Value);

          }

          // show the remaining information
          console.log("Country: " + movieBody.Country);
          console.log("Language: " + movieBody.Language);
          console.log("Plot: " + movieBody.Plot);
          console.log("Actors: " + movieBody.Actors);
          console.log("\n================================\n");
      };
  });
};


// do-what-it-says function
function randomSearch() {

  // read random.txt file
  fs.readFile("random.txt", "utf8", function (err, data) {

    // after the comma, text is split into an array
    var randomArray = data.split(",");

    // based on what index[0] on random.txt is set, liri will execute the following
    if (randomArray[0] == "spotify-this-song") {
      searchSong(randomArray[1]);
    } 
    
    else if (randomArray[0] == "movie-this") {
      searchMovie(randomArray[1]);
    }
  });
};




