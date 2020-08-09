$(document).ready(function() {
    console.log("ready");

    // AJAX call to OpenWeather API - Current Weather Data
    function searchCityWeather(city) {
        var key = "b0a1a1ca5591877ea2e9552cf91da345"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var cityName = response.name;
            $("#searchedCityDisplay").append(cityName);

            var tempNow = response.main.temp;
            $("#temp-now").append(Math.round(tempNow) + "&deg;");

            // var humidityNow = response.main.humidity;

            // var windSpeedNow = response.wind.speed;

        });
    }

    // AJAX call - UV Index

    // AJAX Call - 5-Day Forecast


    // Event listener on city search btn
    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        // Store the city searched
        var inputCity = $("#city-input").val().trim();
        searchCityWeather(inputCity);

    });
});