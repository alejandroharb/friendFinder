var path = require('path');
var express = require('express');
var app = express();

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
        res.json(questions) //variable of object with all people in data
    })

    app.post('/api/friends', function(req, res) {
        var data = req.body;
    })

}