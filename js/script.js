/*
QUESTIONS

1. Why line 41 dont need unqiue ID, how does it know which to append to?
2. Click events not working for previous results

*/

var topics = 'sunset';

// ['forest', 'park', 'sunrise','sunset'];
var limit = 5;

$("#search").on("click", function (e) {
    e.preventDefault();
    var kw = $("#keyword").val();
    console.log(kw);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + kw + "&api_key=wtCeJUwPyPnul9t4x3xgoWiB2kzPohiP&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then(function (list) {

        var resultframe = "<div class='card'><div class='card-body'" + "id='" + kw + "'>" +
            "<div class='card-header'>" + kw.toUpperCase() + "</div>" +
            "</div>";

        $("#imgparent").prepend(resultframe);

        for (i = 0; i < limit; i++) {
            console.log(list.data[i].images.fixed_width_still.url);

            var elImage =
            "<img src=" + list.data[i].images.fixed_width_still.url +
            " data-still=" + list.data[i].images.fixed_width_still.url +
            " data-animate=" + list.data[i].images.fixed_width.url +    
            " data-state='still' ></div>"

            $('#' + kw).append(elImage); // remove spacing replacing function
;   
        }
        test(kw);
    });
   
});

function test(search){
    console.log('attaching events');

    $("#" + search + " img").on("click", function() { //remove event listener than reattach
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");    
        var currentState = $(this).attr("data-state");
    console.log('click')
        if(currentState == "still") {
    
            $(this).attr("data-state", "animate");
            $(this).attr("src", animate);
        } else {
            currentState == "animate";
            $(this).attr("data-state", "still");
            $(this).attr("src", still);
        }
    
    });
};

// $("img").off('click').on("click", function() {