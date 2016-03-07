console.log("hello weather")

// https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE

var successCallback = function(positionObject){
	console.log(positionObject)
	var lat = positionObject.coords.latitude
	var long = positionObject.coords.longitude


	var container = document.querySelector("#container")

	var fullUrl = baseUrl + "/" + lat + "," + long + "?callback=?"
	$.getJSON(fullUrl).then(
		function(resp){
			var currentTime = new Date(resp.currently.time * 1000).getTime()
			var timeToDate = new Date(currentTime)
			container.innerHTML = "<p>" + timeToDate + "</p><p>" + resp.currently.temperature + " &#8457</p><p>" + resp.currently.summary + "</p>" 
			console.log(typeof resp.currently.time)
		})
	
}	





var errorCallback = function(error) {
	console.log(error)
}

var apiKey = "/7b2513b26ff982671a688e60cd515792"
var baseUrl = "https://api.forecast.io/forecast" + apiKey

navigator.geolocation.getCurrentPosition(successCallback, errorCallback)