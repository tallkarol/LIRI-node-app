
require('dotenv').config();

let command = process.argv[2]

var Spotify = require('node-spotify-api');

var request = require('request')

var moment = require('moment')

var fs = require('fs')

let movie = ""
let bands = ""


// commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

if (command === "concert-this") {
    var artistName = [];
    for (i = 3; i < process.argv.length; i++) {
        artistName.push(process.argv[i])
    }
    let artistTogether = artistName.join("+")
    console.log("\nUpcoming Concert(s) for " + artistTogether)
    request(`https://rest.bandsintown.com/artists/${artistTogether}/events?app_id=codingbootcamp`, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            bands = JSON.parse(body);
            if (!bands[0]) {
                console.log("\nNo Upcoming Shows to Display\n")
            } else {
            for (i = 0; i < bands.length; i++) {
                console.log("\n" + moment(bands[i].datetime).format("MM/DD/YYYY"))
                console.log(bands[i].venue.name)
                console.log(bands[i].venue.city + ", " + bands[i].venue.country + "\n")
            }
            }
        }
    })
}


if (command === "spotify-this-song") {
    console.log("Spotify it up")
}
// spotify-this-song '<song name here>'
// search spotify

// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
//   });
   
//   spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });

// return Artist(s), Song Name, Preview Link, Album
// if no song, then return results for I Saw the Sign / Ace of Base


if (command === "movie-this") {
    if (process.argv[3]) {
    var movieName = [];
    for (i = 3; i < process.argv.length; i++) {
        movieName.push(process.argv[i])
    }
    let movieTogether = movieName.join("+")
    request(`http://omdbapi.com?t=${movieTogether}&y=&apikey=trilogy`, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            movie = JSON.parse(body);
            console.log("\nTitle: " + movie.Title)
            console.log("Year: " + movie.Year)
            console.log("imdbRating: " + movie.imdbRating)
            console.log("Rotten Tomatoes : " + movie.Ratings[2].Value)
            console.log("Country : " + movie.Country)
            console.log("Language : " + movie.Language)
            console.log("Plot : " + movie.Plot)
            console.log("Actors : " + movie.Actors + "\n")
        }
    })
        } else {
            request(`http://omdbapi.com?t=mr+nobody&y=&apikey=trilogy`, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body)
                    movie = JSON.parse(body);
                    console.log("\nTitle: " + movie.Title)
                    console.log("Year: " + movie.Year)
                    console.log("imdbRating: " + movie.imdbRating)
                    console.log("Rotten Tomatoes : " + movie.Ratings[2].Value)
                    console.log("Country : " + movie.Country)
                    console.log("Language : " + movie.Language)
                    console.log("Plot : " + movie.Plot)
                    console.log("Actors : " + movie.Actors + "\n")
                }
            })
        }
    }

if (command === "do-what-it-says") {
    console.log("Concert it up")
}
// do-what-it-says
// use fs node package to take the text inside of random.txt and use it to call a LIRI command
// should run spotify-this-song for I Want it That Way


// BONUS
// in addition to logging the data to the terminal / bash, output to log.txt
// append each command you run to the log.txt file
// do not overwrite your file each time you run a command