// 1. create tipic Array
// 2. allow search add to array
// 3. setup api
// 4. append buttons and images



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

        var resultframe = "<div class='card'" + "id='" + kw + "'>" +
            "<div class='card-header'>" + kw.toUpperCase() + "</div>" +
            "</div>";

        $("#imgparent").prepend(resultframe);

        for (i = 0; i < limit; i++) {
            console.log(list.data[i].images.fixed_width_still.url);

            var html =

                "<div class='card-body'" +
                " data-still=" + list.data[i].images.fixed_width_still.url +
                " data-animate=" + list.data[i].images.fixed_width.url +
                " data-state='still' >" + "<img src=" + list.data[i].images.fixed_width_still.url + ">" + "</div>";
            $('#' + kw).append(html);

        }
    });
});

$(".card-body").on("click", function() {

    var still = $(this).attr("data-still");
    var animate = $(this).attr("data-animate");    
    var currentState = $(this).attr("data-state");

    if(currentState == "still") {
        $(this).attr("data-state", animate);
        $(this).attr("src", animate);
    } else {
        currentState = "still";
        $(this).attr("src", still);
    }

});


// //  Class .gif on click function triggers
//     $(".gif").on("click", function() {
//   // Storing attribute in 'State = Still'
//       var state = $(this).attr("data-state");
  
//       if (state == "still") {
//   // storing attribute into animate
//         var animate = $(this).attr("data-animate");
//   // Replacing src tag with new
//         $(this).attr("src", animate);
//   // Replacing data-state tag with new
//         $(this).attr("data-state", "animate");
       
//       } if (state == "animate") {
//         var still = $(this).attr("data-still");
//         $(this).attr("src", still);
//         $(this).attr("data-state", "still");
//       };

