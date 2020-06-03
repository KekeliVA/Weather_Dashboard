


// load the data using an ajax GET request
var queryURL;


$(document).ready(function() {
  $("#search-button").on("click", function() {
    event.preventDefault();
    var cityName = $("#search-value").val();
    console.log(cityName);
    forecast(cityName);
   $("#search-value").val("");

    searchWeather(cityName);
  });
  
  $(".history").on("click", "li", function(){
    searchWeather($(this).text());
  });

  function addToHistory(text){
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(cityName) {
    console.log("searching...");
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=4add603c6d72f3240c17a3fc3837ece3&units=imperial",
      method: "GET",
      dataType: "json",
      success: function(data) {
        if (!history.includes(cityName)) {
          history.push(cityName);
          window.localStorage.setItem("history", JSON.stringify(history));
          
        addToHistory(cityName);  
        }
        $("#today").empty();

        
        var title = $("<h3>").addClass("card-title").text(data.name + " ( " + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "mph");
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " degrees F");
        var cardBody = $("<div>").addClass("card-body");
        var cardImg = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        title.append(cardImg);
        cardBody.append(title, temp, humidity, wind);
        card.append(cardBody);
        $("#today").append(card);
      }
    });

    
    // build function for forecast
    // loop over days for card creation
    // look carefully over api because forecast may be done by time
    // call forecast function inside searchWeather function after line 55    
  }

function forecast(cityName) {
  console.log("searching for forecast");
  var cityName = $("#search-value").val();
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=4add603c6d72f3240c17a3fc3837ece3&units=imperial",
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
      for(var i = 0; i<data.list.length; i+=8){
        var date = data.list[i].dt_txt;

        console.log(date);
        
        var title = $("<h3>").addClass("card-title").text(date)
        var card = $("<div>").addClass("card");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp);
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity);
        var cardBody = $("<div>").addClass("card-body");
        var cardImg = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + data.list[i].weather[0].icon);
        
        console.log(temp);
        console.log(humidity);
      }
    }
  })
};


  
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    addToHistory(history[i]);
  }
});  