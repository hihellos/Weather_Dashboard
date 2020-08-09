$(document).ready(function() {
    console.log("ready");

    var key = "b0a1a1ca5591877ea2e9552cf91da345"

    // AJAX call to OpenWeather API - Current Weather Data
    function searchCityWeather(city) {
        $("#searchedCityDisplay").text("");
        $("#temp-now").text("");
        $("#humid-now").text("");
        $("#wind-now").text("");

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var cityName = response.name;
            $("#searchedCityDisplay").append(cityName);

            var tempNow = response.main.temp;
            $("#temp-now").append(Math.round(tempNow) + "&deg;" + " F");

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
    function searchCityForecast(city) {
        $("#country-name").text("");

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=5&appid=" + key;
        

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var countryName = response.country;
            $("#country-name").append(countryName);

        })
    }

    // Event listener on city search btn
    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        // Store the city searched
        var inputCity = $("#city-input").val().trim();
        searchCityWeather(inputCity);

    });

    // Use moment.js to display todays day nex tto current city, and next 5 days in forecast

    // LOCAL STORAGE - Store search history of cities
    var cityInput = $("#city-input");
    var searchForm = $("#search-btn");
    var pastCityList = $("#past-cities");

    var cities = [];

    init();

    // Render past cities
    function renderCities() {
        pastCityList.html("");

        for (var i = 0; i < 10; i++) {
            var city = cities[i];

            var li = $("<li>");
            li.text(city);
            li.attr("city-index", i);
            li.addClass("btn btn-link list-group-item list-group-item-action list-group-item-light")

            pastCityList.prepend(li);
        }
    }

    // Get stored cities from local storage
    function init() {
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
            cities = storedCities;
        }
        renderCities();
    }

    function storeCities() {
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    // When a city is searched
    searchForm.on("click", function(event) {
        event.preventDefault();

        var cityText = cityInput.val().trim();

        if (cityText === "") {
            return;
        }

        cities.unshift(cityText);
        $("#city-input").html("");

        storeCities();
        renderCities();
    });

    // When a city in the search history is clicked
    pastCityList.on("click", function(event) {
        var element = event.target;

        if (element.matches("li") === true) {
            var index = JSON.parse(localStorage.getItem(cities[i]));

            console.log(index);
            searchCityWeather(index);
        }
    })

    // When page is opened, present last searched city info
});