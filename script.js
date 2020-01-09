$(document).ready(function() {
  
   
  $("button").on("click", function(event) {
    event.preventDefault();

    // Deleting the current weather prior to adding new prior weather so that it doesn't repeat
    // $("#current-weather").empty();

    // Deleting the forecast cards prior to adding new forecast cards so that they don't repeat
    // $("#forecast-cards").empty();


    var city = $("#city-input")
      .val()
      .trim();

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
      city;

    var queryURL2 =
      "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
      city;

    var latitude;

    var longitude;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // Store all of the retrieved data inside of an object called "weather"
      .then(function(weather) {
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(weather);

        var nowMoment = moment();

        var displayMoment = $("<h3>");
        $("#city-name").append(displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")"));

        var cityName = $("<h3>").text(weather.name);
        $("#city-name").prepend(cityName);

        var weatherIcon = $("<img>");
        weatherIcon.attr(
          "src",
          "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
        );
        $("#current-icon").append(weatherIcon);

        $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
        $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
        $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");

        latitude = weather.coord.lat;
        longitude = weather.coord.lon;

        var queryURL3 =
          "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
          "&lat=" +
          latitude +
          "&lon=" +
          longitude;

        $.ajax({
          url: queryURL3,
          method: "GET"
        // Store all of the retrieved data inside of an object called "uvIndex"
        }).then(function(uvIndex) {
          console.log(uvIndex);

          var uvIndexDisplay = $("<button>");
          uvIndexDisplay.addClass("btn btn-danger");
          
          $("#current-uv").text("UV Index: ");
          $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
          console.log(uvIndex[0].value);

          $.ajax({
            url: queryURL2,
            method: "GET"
        // Store all of the retrieved data inside of an object called "forecast"
          }).then(function(forecast) {
            console.log(queryURL2);

            console.log(forecast);
        // Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
            for (var i = 4; i < forecast.list.length - 3; i += 8) {
                var forecastDate = $("<h5>");

                console.log("#forecast-date" + (i / 8 + .5));

                $("#forecast-date" + (i / 8 + .5)).append(forecastDate.text(nowMoment.add(1, 'days').format("M/D/YYYY")));
                
                var forecastIcon = $("<img>");
                forecastIcon.attr(
                    "src",
                    "http://openweathermap.org/img/w/" +
                      forecast.list[i].weather[0].icon +
                      ".png"
                  );
                  $("#forecast-icon" + (i / 8 + .5)).append(forecastIcon);
      
                  console.log(forecast.list[i].weather[0].icon);
      
                  $("#forecast-temp" + (i / 8 + .5)).text(
                    "Temp: " + forecast.list[i].main.temp + " °F"
                  );
                  $("#forecast-humidity" + (i / 8 + .5)).text(
                    "Humidity: " + forecast.list[i].main.humidity + "%"
                  );  

                  $(".forecast").attr('style', 'background-color:dodgerblue; color:white');
                  

            }
            
          });
        });
      });
  });
});
