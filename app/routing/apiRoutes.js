// LOAD DATA

var friendsDb = require("../data/friends");

// ROUTING

module.exports = function(app) {
// API GET Requests
 app.get("/api/friends", function(req, res) {
    res.json(friendsDb);
  });



// API POST Requests
 app.post("/api/friends", function(req, res) {
      var userScore = req.body.scores;
      var scoresArray =[];
      var friendCount = 0;
      var bestFriend = 0;
  //compare userData to friendsDb to get best match
      for(var i=0; i<friendsDb.length; i++){
        var scoreDiff = 0;
        for(var x=0; x<userScore.length; x++){
          scoreDiff += (Math.abs(parseInt(friendsDb[i].scores[x])-parseInt(userScore[x])));
        }
        scoresArray.push(scoreDiff);
      }
      for(var i=0; i<scoresArray.length; i++){
        if (scoresArray[i] <= scoresArray[bestFriend]){
          bestFriend = i;
        }
      }
  //returns best match and pushes userData into friends array
      res.json(friendsDb[bestFriend]);
      friendsDb.push(req.body);

  });

// Empty out the arrays of data

  app.post("/api/clear", function() {
    friendsDb = [];
    console.log(tableData);
  });
};