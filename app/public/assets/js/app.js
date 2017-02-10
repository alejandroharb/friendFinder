
$(document).ready(function() {
    $('select').material_select();
    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');
    // form POST ajax request
    $('#surveySubmit').on('click', function() {
        //collect name and link inputs
        var name = $('#name').val().trim();
        var link = $('#img_link').val().trim();
        //===loop through select elements and collect selected option
        var e = document.getElementById('survey').elements;
        //temporary array for userChoices
        var userAnswerArr = [];
        //loops through all form elements
        for( var i = 0; i < e.length; i++) {
            //looks only at select elements
           if(e[i].localName == 'select') {
                var a = e[i].selectedIndex;
                //pushes to array
                userAnswerArr.push(parseInt(a))
           }
        }    
       $.ajax({url:'/api/friends', method: 'POST'}).done(function(response) {
            response.name = name,
            response.link = link,
            response.arr = userAnswerArr
        })
       //prevents page reload upon submitting form
       return false; 
    })
    
})