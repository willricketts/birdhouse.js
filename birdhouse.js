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
  console.log("");
  console.log("birdhouse.js - Will Ricketts 2013");
  console.log("Web: http://willricketts.com");
  console.log("Twitter: @willricketts");
  console.log("Send me some Dogecoin! -- D78V7nRX32mb7F4o5QvCAyfX3iaSAyPP1h");
  console.log("");
  console.log("1: Create Tweet");
  console.log("2: Realtime Keyword Filter");
  console.log("3: Hashtag Scraper");
  console.log("4: Mention Listener");
  console.log("");
  input.question("Select a module: ", function(answer) {

    var module = answer;

    if (answer == 1) {
      //CREATE TWEET
      input.question("Tweet:  ", function(answer) {
        if (answer.length <= 140)
        {
          T.post('statuses/update', { status: answer }, function(err, reply) {
            console.log("");
            console.log("Tweet successfully posted!")
            console.log("");
            birdhouse();
          })
        }
        else
        {
          console.log("Your tweet was too long.");
          birdhouse();
        }
      })
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
    else if (answer == 4)
    {
      //MENTION LISTENER
      var stream = T.stream('user');
      stream.on('tweet', function (tweet){
        if (tweet.in_reply_to_screen_name == '')
        {
          console.log('Mention:  ' + tweet.text);
        }
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