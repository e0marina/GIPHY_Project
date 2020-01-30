// GLOBAL VARIABLES
//==============================================================
var topics = [
  "picasso",
  "frida kahlo",
  "basquiat",
  "van gogh",
  "vermeer",
  "michaelangelo",
  "monet",
  "yayoi kusama"
];
function displayTopicsGifs() {
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=picasso&api_key=AO46ZvF2PWKxb55EA1XxuXtwjegfnCH8&limit=10";

  // Here we run our AJAX call to the GIPHY API
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // we store all of the retreived data inside an object called "response"

    .then(function(response) {
      //log the query URL
      console.log(queryURL);
      //log the resulting object
      console.log(response);
      //creates a div to hold the gif
      $("<div>").append("#gif-area");
      //retreives the static image

      //displays the static image
      //retrieves the rating data
      var gifRating = response.data.rating;
      //displays the rating

      //?on click function to make the image a gif
    });
}
//function for creating buttons with artists
function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-div").empty();

  //looping through topics array
  for (var i = 0; i < topics.length; i++) {
    //Then dynamically generating buttons for each artist in the array
    var a = $("<button>");
    // Adding a class
    a.addClass("artist");
    // Adding a data-attribute with a value of the topics at index i
    a.attr("data-name", topics[i]);
    // Providing the button's text with a value of the topics at index i
    a.text(topics[i]);
    // Adding the button to HTML
    $("#buttons-div").append(a);
  }
  // Calling the renderButtons function at least once to display the initial list of topics
  renderButtons();
  console.log("it's supposed to be rendering");
}
