$(document).ready(function() {
    console.log("ready");

    var key = "b0a1a1ca5591877ea2e9552cf91da345"

    // AJAX call to OpenWeather API - Current Weather Data
    function searchCityWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var cityName = response.name;
            $("#searchedCityDisplay").append(cityName);

            var tempNow = response.main.temp;
            $("#temp-now").append(Math.round(tempNow) + "&deg; F");

            var humidityNow = response.main.humidity;
            $("#humid-now").append(humidityNow + "&percnt;");

            var windSpeedNow = response.wind.speed;
            $("#wind-now").append(Math.round(windSpeedNow) + " MPH");

            // lat.push(response.coord.lat)
        });
    }

    // var lat = [];
    // var lon = "";

    // // AJAX call - UV Index
    // function searchUVindex(uv) {
    //     var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
    // }

    // AJAX Call - 5-Day Forecast


    // Event listener on city search btn
    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        // Store the city searched
        var inputCity = $("#city-input").val().trim();
        searchCityWeather(inputCity);

    });

    // Use moment.js to display todays day nex tto current city, and next 5 days in forecast

    // Store search history of cities

});