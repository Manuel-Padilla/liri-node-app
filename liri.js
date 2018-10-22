// Read and set environment variables
require("dotenv").config();

const keys = require('./keys');
const inquirer = require('inquirer');
const fs = require('fs');
const request = require('request');
const spotify = require('node-spotify-api');
const moment = require('moment');
const spotifyKey = new spotify(keys.spotify);
const omdbKey = new OBDb(keys.ombd);
const bandsintownkey = new bandsintownkey(keys.bandsintown);

function searchSpotify() {
  
}