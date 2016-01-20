# Twitter Game
This repo represents a game which interestingly uses twitter data. The idea of the game is based upon simple "Match the Following" kind problems. This game picks 10 popular Twitter Users from a lot of many and then picks a recent random tweet for each of those 10 users. All the tweets and the Twitter users are shuffled up and placed on the screen just like a 'Match the Following' problem. The game is to match all the Twitter User with their correct tweet in a stipulated time. The faster the game is solved more points are gained. There are point deductions for each wrong match to avoid mindless matching.

## Purpose of Creating the Game
This game provides a new and interesting way of interacting with Twitter Data. The idea of using twitter data and creating a game out of it with time, score and realism(real time tweets) can prove to be engaging as well as an entertaining experience. We have also structured the game in a way where it feels competitive and is different everytime you play it.

## Scoring System
The scoring system is fairly simple. The basic thing to know about the scoring is that the player would be able to earn more points if the player is able to maximize his or her correct matches as early as possible. Time is key here. Also if there is any time remaining when the puzzle is solved then for each remaining second some extra bonus points are awarded.

The Base score that the player can acheive is the following:

![Alt text](https://github.com/vreddi/twitterGame/blob/readme/images/Base-Score-Eq.png "Base Score Equation")

Where,

`c`: Condition that represents the moment when the player performs a correct match

`t`: Current Time Remaining

`s`: Current Match Score (out of 10)

If time remains then the player can earn 20 points for every remaining second. These bonus points can only be earned when all the matches made by the player are correct.

![Alt text](https://github.com/vreddi/twitterGame/blob/readme/images/Bonus-Score-Eq.png "Bonus Score Equation")

Where,

`rt`: Remaining Time

So using the 2 scoring formats the following equation is generated which specifies the final score for the player.

![Alt text](https://github.com/vreddi/twitterGame/blob/readme/images/Final-Score-Eq.png "Final Score Equation")

NOTE: There are also deductions. For each wrong match made by the player, he or she loses 10 seconds from the time. Time is money and in this case your score. So it is better to avoid wrong matchings to maximize the score.

The following graph depicts how potential score drops every second if we move from a higher time on the `x-axis` to a lower time on the `x-axis`.
![Alt text](https://github.com/vreddi/twitterGame/blob/readme/images/Scoring-Plot.png "Scoring Plot")

## Twitter API
This game is based on the data provided by Twitter. Using Twitter's public API we are able to get the most recent tweets for a twitter user (if the tweets are not private). Using these recent tweets we select a random tweet that becomes the part of the matching game.

[GET statuses/user_timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline_)

The above is the API call which helps in creating the game.

The Twitter API now authenticates using OAuth for which we thank [@themattharris](https://twitter.com/themattharris) for his contribution: [An OAuth library written in PHP by @themattharris](https://github.com/themattharris/tmhOAuth).

Using the Twitter API we create a local JSON file which acts as the Game Object [(Example Game Object)](https://github.com/MidnightJabber/twitterGame/blob/master/ExampleData.json). This Object contains all the data that is needed for the game including the correct matchings. It also contains incorrect matchings. The incorrect matchings specify which tweet needs to be dispayed infront of what Twitter user so that the game is properly shuffled.