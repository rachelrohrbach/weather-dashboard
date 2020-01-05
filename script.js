$("button").on("click", function(event) {
  event.preventDefault();

  var city = $("#city-input").val();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
    city;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
    });
});
