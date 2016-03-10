console.log("hello weather")

// https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE

//global variables

var apiKey = "/7b2513b26ff982671a688e60cd515792"
var baseUrl = "https://api.forecast.io/forecast" + apiKey
var container = document.querySelector("#container")

// location.hash = "daily" + "/" + lat + "," + long

// var positionObject
// 	var geoSuccess = function(position) {
// 	positionObject = position
	// var lat = positionObject.coords.latitude
	// var long = positionObject.coords.longitude
// 	location.hash = "" + "/" + lat + "," + long

// 	}

var lat = "29"
var long = "-95"

var fullUrl = baseUrl + "/" + lat + "," + long + "?callback=?"

var currently = document.querySelector('button[value="currently"]')
var daily = document.querySelector('button[value="daily"]')
var hourly = document.querySelector('button[value="hourly"]')


//hash controller to activate the different views

var hashController = function(){
	var route = window.location.hash.substr(1)
	var routeParts = route.split("/")
	var viewType = routeParts[0]
	var currentQuery = routeParts[1]

	if (viewType === "currently") {
		renderCurrentView(currentQuery)
	}
	else if (viewType === "daily") {
		renderDailyView(currentQuery)
	}
	else if (viewType === "hourly") {
		renderHourlyView(currentQuery)
	}
	
}

var changeView = function(positionObject){

	var buttonEl = event.target
	var currentQuery = location.hash.split('/')[1]

	location.hash = buttonEl.value + "/" + currentQuery

}

//the functions that render the different views

var renderCurrentView = function(jsonData) {
$.getJSON(fullUrl).then(currentWeather)
}

var renderDailyView = function(jsonData) {
$.getJSON(fullUrl).then(dailyWeather)
}

var renderHourlyView = function(jsonData) {
$.getJSON(fullUrl).then(hourlyWeather)
}

// the inital call function that obtains the user's location

// window.onload = function(){
	// var positionObject
	// var geoSuccess = function(position) {
	// positionObject = position
	// lat = positionObject.coords.latitude
	// long = positionObject.coords.longitude
	// // location.hash = '' + "/" + lat + "," + long
	// hashController()



	// }
	// navigator.geolocation.getCurrentPosition(geoSuccess, errorCallback)
	// fullUrl
	
// }


// var successCallback = function(positionObject){
// 	var lat = positionObject.coords.latitude
// 	var long = positionObject.coords.longitude
	// location.hash = "currently" + "/" + lat + "," + long

// 	var fullUrl = baseUrl + "/" + lat + "," + long + "?callback=?"
// 	$.getJSON(fullUrl).then(currentWeather)
// }

var errorCallback = function(error) {
	console.log(error)
}

	
// the function that gets and paints the current weather	

var currentWeather = function(jsonData){

	// var positionObject
	var geoSuccess = function(position) {
	var positionObject = position
	lat = positionObject.coords.latitude
	long = positionObject.coords.longitude
	location.hash = "currently" + "/" + lat + "," + long

	}

	navigator.geolocation.getCurrentPosition(geoSuccess, errorCallback)
	fullUrl
	console.log(fullUrl)

			container.innerHTML = "<div class='currentContainer'><p>" + jsonData.currently.temperature.toPrecision(2) + " &#8457</p><p>" + jsonData.currently.summary + "</p></div>" 

		}


var hourlyWeather = function(jsonData){

		// var positionObject
	var geoSuccess = function(position) {
	var positionObject = position
	lat = positionObject.coords.latitude
	long = positionObject.coords.longitude
	location.hash = "hourly" + "/" + lat + "," + long

	}

	var htmlString = ""
	var hoursArray = jsonData.hourly.data

	for(var i = 0; i < 12; i++) {
		
		var hourlyObj = hoursArray[i]
		var hourlyTime = new Date(hourlyObj.time * 1000).getTime()
		var timeToDate = new Date(hourlyTime).toString()

		htmlString += "<div class='hourContainer'><p>" + timeToDate.substr(0, 10) + "</p>"
		htmlString += "<p>" + timeToDate.substr(16, 5) + "</p>"
		htmlString += "<p>" + hourlyObj.temperature.toPrecision(2) + " &#8457</p>"
		htmlString += "<p>" + hourlyObj.summary + "</p></div>"

	}
		container.innerHTML = htmlString
}		

var dailyWeather = function(jsonData){

		// var positionObject
	var geoSuccess = function(position) {
	var positionObject = position
	lat = positionObject.coords.latitude
	long = positionObject.coords.longitude
	location.hash = "daily" + "/" + lat + "," + long

	}

	var htmlString = ""
	var daysArray = jsonData.daily.data

	for(var i = 0; i < 8; i++) {
		
		var daysObj = daysArray[i]
		var daysTime = new Date(daysObj.time * 1000).getTime()
		var timeToDate = new Date(daysTime).toString()

		htmlString += "<div class='dayContainer'><p>" + timeToDate.substr(0, 10) + "</p>"
		htmlString += "<p class='tempMax'>" + daysObj.temperatureMax.toPrecision(2) + " &#8457</p>"
		htmlString += "<p class='tempMin'>" + daysObj.temperatureMin.toPrecision(2) + " &#8457</p>"
		htmlString += "<p>" + daysObj.summary + "</p></div>"

	}
		container.innerHTML = htmlString	
}

window.addEventListener("hashchange", hashController)

currently.addEventListener("click", changeView)
hourly.addEventListener("click", changeView)
daily.addEventListener("click", changeView)		

//the call that requests user location

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

// hashController()

if (window.location.hash === '') window.location.hash = "currently"
else hashController()