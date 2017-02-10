var path = require('path');
var express = require('express');
var app = express();

var friendsData = require('../data/friends.js');

function findMatch(arr) {
    var diffArray = [];
    var matches = [];
    //---------------------Calculate sum of differences----------------------------
    //loop through friends data, at each array for person, get differences and sum them up
    for(let i = 0; i < friendsData.length; i++) {
        var comparisonArray = friendsData[i].answers;
        //reduces whole array into sum of differences
        var diff = comparisonArray.reduce(function(accum, elem, index) {
            return accum + Math.abs(elem - arr[index]);
        },0);
        //push differences and sum value to diffArray
        diffArray.push(diff);
    }
    //-----------------------Find smallest difference--------------------------
    //loop through diffArray (containing difference index comparing all friend with user) and check which is smallest
    for(let i = 0; i < diffArray.length; i++) {
        //temporary array holding smallest value
        var tempVar = diffArray[i];
        //loop through diffArray again to compare each value for smallest
        for( let k = 0; k < diffArray.length; k++) {
            //checkVar is starting variable at beginning of array to be checked with tempVar
            var checkVar = diffArray[k];
            //check if smaller
            if(checkVar < tempVar) {
                tempVar = checkVar;
            } else {continue;}
        }
    }
    //-----------------------Push matches to matches Array--------------------------
    //for smallest difference variable (tempVar) found, its index coincides with index of matched friend
    //loop through diffArray to check at which index our small variables are,
    //push friend object that was a match into array of matches (in case there were more than one)
    for(let i = 0; i < diffArray.length; i++) {
        if(tempVar === diffArray[i]) {
            matches.push(friendsData[i]);
        }
    }

    return matches;
}

//======Survey Questions Data==
    var questions = [
        'You adore chocolate.',
        'You like spending time out, exploring and discovering.',
        'You love to read.',
        'You like Star Wars.',
        'You like bein in large crowds and often being in the center of conversations.',
        'You\'re comfortable sharing your points of views and beliefs, and can debate ideas without confrontation.',
        'In class, you keep your questions to yourself because you\'ll figure out the answer on your own later.'
    ];



module.exports = function(app) {
    //=====api routes=====

    app.get('/api/questions', function(req, res) {
        res.json(questions);
    })

    app.post('/api/friends', function(req, res) {
        var data = req.body;
        //find friend matches for user
        var matches = findMatch(data.answers);
        //add user's info to database (push into array of objects)
        friendsData.push(data);
        //send back to front-end the array of matches
        res.send(matches);
    })

}