// GLOBAL VARIABLES
//==============================================================
// Initial Array of artists

var artists = [
  "picasso",
  "frida kahlo",
  "basquiat",
  "van gogh",
  "vermeer",
  "michaelangelo",
  "alice neel",
  "yayoi kusama",
  "salvador dali",
  "andy warhol",
  "gustav klimt",
  "henri matisse",
  "georgia o'keeffe",
  "paul cezanne",
  "diego rivera",
  "francis bacon",
  "mary cassatt",
  "roy lichtenstein",
  "lucian freud"
];

//==============================================================
// FUNCTIONS
//==============================================================
function displayArtistGifs() {
  $("#gif-area").empty();
  var artist = $(this).attr("data-name");
  // Here we are building the URL we need to query GIPHY's database
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=AO46ZvF2PWKxb55EA1XxuXtwjegfnCH8&q=" +
    artist +
    "&limit=10";

  // Here we run our AJAX call to the GIPHY API
  $.ajax({
    url: queryURL,
    method: "GET"
  }) // we store all of the retreived data inside an object called "response"
    .then(function(response) {
      //log the query URL
      console.log(queryURL);
      //log the resulting object
      console.log(response);
      console.log(response.data); //array
      console.log(response.data[0].type); //returns gif

      const arr = response.data;
      //some sort of for loop
      for (let i = 0; i < arr.length; i++) {
        const indivGif = arr[i];

        //creates a div to hold the gif
        var gifDiv = $("<div class='indiv-gif'>");
        //stores the static image
        console.log(indivGif.images.fixed_width_still.url);
        var movinggif = indivGif.images.fixed_width.url;
        //creates an element to hold the moving image, to be used later
        // var pHalf = $("<img>").attr("src", movinggif);

        var imgstatic = indivGif.images.fixed_width_still.url;
        //Creates an element to hold the static image
        var pOne = $("<img>");
        pOne.attr("src", imgstatic);
        pOne.attr("movinggif", movinggif); //adding one more attribute
        pOne.attr("imgstatic", imgstatic);
        pOne.attr("imgstate", "still"); //have to save both vals in order to change back to still
        pOne.addClass("indiv-gif");
        //displays the static image
        gifDiv.append(pOne);
        //stores the moving gif image to be used later
        console.log(indivGif.images.fixed_width.url);

        //stores the rating data
        var gifRating = indivGif.rating;
        console.log(gifRating);

        //creates an element to hold the rating
        var pTwo = $("<p>").text(gifRating);
        //displays the rating
        gifDiv.append(pTwo);
        //stores the moving gif
        console.log(gifDiv);
        //puts the gifs on the page
        $("#gif-area").append(gifDiv);
      }
    });
}

$(document).on("click", ".indiv-gif", function() {
  console.log("it's working!");

  var state = $(this).attr("imgstate");
  console.log(state);
  console.log(this);

  if (state === "still") {
    $(this).attr("src", $(this).attr("movinggif"));
    $(this).attr("imgstate", "animate");
  } else {
    $(this).attr("src", $(this).attr("imgstatic"));
    $(this).attr("imgstate", "still");
  }
});

//function for creating buttons with artists
function renderButtons() {
  // Deleting the artist buttons prior to adding new artist buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-div").empty();

  //looping through artists array
  for (var i = 0; i < artists.length; i++) {
    //Then dynamically generating buttons for each artist in the array
    var a = $("<button>");
    // Adding a class
    a.addClass("gifButton");
    // Adding a data-attribute with a value of the artist at index i
    a.attr("data-name", artists[i]);
    // Providing the button's text with a value of the artist at index i
    a.text(artists[i]);
    // Adding the button to HTML
    $("#buttons-div").append(a);
  }
}
// This function handles events where the add artist button is clicked
$("#add-artist").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var artist = $("#artist-input")
    .val()
    .trim();

  // The artist from the textbox is then added to our array
  artists.push(artist);

  // Calling renderButtons which handles the processing of our artist array
  renderButtons();
});

//Click event listeners to elements with a class of gif
$(document).on("click", ".gifButton", displayArtistGifs);

// At the very bottom: Calling the renderButtons function to display the intial buttons
renderButtons();
