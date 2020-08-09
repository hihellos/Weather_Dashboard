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
        $("#today-date").text("");
        $("#country-name").text("");
        $("#next-day-1").text("");
        $("#next-day-2").text("");
        $("#next-day-3").text("");
        $("#next-day-4").text("");
        $("#next-day-5").text("");
        $("#f-temp1").text("");
        $("#f-temp2").text("");
        $("#f-temp3").text("");
        $("#f-temp4").text("");
        $("#f-temp5").text("");
        $("#f-humid1").text("");
        $("#f-humid2").text("");
        $("#f-humid3").text("");
        $("#f-humid4").text("");
        $("#f-humid5").text("");


        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;
        

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var todayDate = response.list[0].dt_txt;
            $("#today-date").text(todayDate.slice(0, 10));
            var countryName = response.city.country;
            $("#country-name").append(countryName);

            var nextDay1 = response.list[6].dt_txt;
            $("#next-day-1").text(nextDay1.slice(5, 10));
            var nextDay2 = response.list[14].dt_txt;
            $("#next-day-2").text(nextDay2.slice(5, 10));
            var nextDay3 = response.list[22].dt_txt;
            $("#next-day-3").text(nextDay3.slice(5, 10));
            var nextDay4 = response.list[30].dt_txt;
            $("#next-day-4").text(nextDay4.slice(5, 10));
            var nextDay5 = response.list[38].dt_txt;
            $("#next-day-5").text(nextDay5.slice(5, 10));

            var nextTemp1 = response.list[6].main.temp;
            $("#f-temp1").append(nextTemp1 + "&deg;" + " F");
            var nextHumid1 = response.list[6].main.humidity;
            $("#f-humid1").append(nextHumid1 + "&percnt;" + " Humidity");
            var nextTemp2 = response.list[14].main.temp;
            $("#f-temp2").append(nextTemp2 + "&deg;" + " F");
            var nextHumid2 = response.list[14].main.humidity;
            $("#f-humid2").append(nextHumid2 + "&percnt;" + " Humidity");
            var nextTemp3 = response.list[22].main.temp;
            $("#f-temp3").append(nextTemp3 + "&deg;" + " F");
            var nextHumid3 = response.list[22].main.humidity;
            $("#f-humid3").append(nextHumid3 + "&percnt;" + " Humidity");
            var nextTemp4 = response.list[30].main.temp;
            $("#f-temp4").append(nextTemp4 + "&deg;" + " F");
            var nextHumid4 = response.list[30].main.humidity;
            $("#f-humid4").append(nextHumid4 + "&percnt;" + " Humidity");
            var nextTemp5 = response.list[38].main.temp;
            $("#f-temp5").append(nextTemp5 + "&deg;" + " F");
            var nextHumid5 = response.list[38].main.humidity;
            $("#f-humid5").append(nextHumid5 + "&percnt;" + " Humidity");

        })
    }

    // Event listener on city search btn
    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        // Store the city searched
        var inputCity = $("#city-input").val().trim();
        searchCityWeather(inputCity);
        searchCityForecast(inputCity);
    });

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