# liri-node-app

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. This application can return information on an upcoming concert, song, or movie depending on the parameters given.

Commands

"concert-this": Returns information on a musical artist for an upcoming concert through the Bands in Town database
Example: node.js concert-this Red Hot Chili Peppers

"spotify-this-song": Returns information on the title on a song through the spotify database. If you would like more than one song, add a number after the command
Example: node.js spotify-this-song 3 Alive

"movie-this": Returns information on the title of a movie through OMDB
Example: node.js movie-this Heat

"do-what-it-says": Reads random.txt and runs liri.js based on whatever is inside the text-file if it is a valid command
In this case, random.txt contains "spotify-this-song,'I Want it That Way'" The application will run the spotify search for "I Want it That Way"


Video Demonstration: https://youtu.be/DJ3Q8zE2uYc
