var Twit = require('twit');
var readline = require('readline');
var fs = require('fs');

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})

var input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function birdhouse() {
  console.log("1: Create Tweet");
  console.log("2: Realtime Keyword Filter")
  console.log("3: Hashtag Scraper")
  input.question("Select a module: ", function(answer) {

    var module = answer;

    if (answer == 1) {
      //CREATE TWEET
      input.question("Tweet:  ", function(answer) {
        T.post('statuses/update', { status: answer }, function(err, reply) {
          console.log("");
          console.log("Tweet successfully posted!")
          console.log("");
          birdhouse();
        })})
    }
    else if (answer == 2) {
      //REALTIME KEYWORD FILTER
      input.question("Enter a term to scrape for: ", function(answer) {
        var hashtag = answer;

        input.close();

        var stream = T.stream('statuses/filter', { track: hashtag, language: 'en' });

        stream.on('tweet', function (tweet) {
          console.log("%====================%");
          console.log("User:  " + "@" + tweet.user.screen_name);
          console.log("Tweet:  " + tweet.text);
        })
      })
    }
    else if (answer == 3)
    {
      //HASHTAG SCRAPER
      input.question("Enter a hashtag to scrape for: ", function(answer) {
        var hashtag = "#" + answer.replace("#", "");

        input.close();

        var stream = T.stream('statuses/filter', { track: hashtag, language: 'en' });

        stream.on('tweet', function (tweet) {
          console.log("%====================%");
          console.log("User:  " + "@" + tweet.user.screen_name);
          console.log("Tweet:  " + tweet.text);
        })
      })
    }
    else
    {
      console.log("");
      console.log("Your selection did not match a module. Try again, champ.")
      birdhouse();
    }
  });
}

birdhouse();