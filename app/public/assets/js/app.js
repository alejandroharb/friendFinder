$(document).ready(function() {
    var queryURL = '/api/questions'
    $.ajax({url: queryURL, method: 'GET'}).done(function(response){
        for(var i = 0; i < response.length; i++) {
            var n = i + 1;
            var q = response[i];
            console.log(q)
            var newLi = $('<li>').text(n + '. ' + q);
            $('#surveyQuestions').append(newLi);
        }
    });
})