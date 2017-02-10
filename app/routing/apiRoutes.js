var path = require('path');
var express = require('express');
var app = express();

var friendsData = require('../data/friends.js');

function compareMatch(arr) {
    var diffArray = [];
    var matches = [];
    for(let i = 0; i < friendsData.length; i++) {
        var comparisonArray = friendsData[i].answers;
        var diff = comparisonArray.reduce(function(accum, elem, index) {
            return accum + Math.abs(elem - arr[index]);
        });
        diffArray.push(diff);
    }
    console.log("diffArray");
    console.log(diffArray);
    for(let i = 0; i < diffArray.length; i++) {
        var tempVar = diffArray[i];
        for( let k = 0; k < diffArray.length; k++) {
            var checkVar = diffArray[k];
            if(checkVar < tempVar) {
                tempVar = checkVar;
            } else {continue;}
        }
        console.log("tempVar: " + tempVar)
    }
    for(let i = 0; i < diffArray.length; i++) {
        if(tempVar === diffArray[i]) {
            matches.push(friendsData[i]);
        }
    }

    console.log("_____matches:_____")
    console.log(matches)
    return matches;
}
compareMatch([5,1,5,1,5,3,4]);
//==data==
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
        res.json(questions)
    })

    app.post('/api/friends', function(req, res) {
        var data = req.body;
        friendsData.push(data);
        res.send(friendsData);
    })

}