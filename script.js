// appId
let APIKey = '69f15c00682d18316696a7296341bf67';
let units = 'imperial'
let searchMethod;

// City or Zip function
function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) 
    searchMethod = 'zip';
    else 
    searchMethod = 'q';
    
}

// API information on search
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${APIKey}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    //background based on weather
    //case sensitive
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("assets/images/clear.jpg")'
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("assets/images/cloudy.jpg")'
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("assets/images/rain.jpg")'
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("assets/images/storm.jpg")'
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("assets/images/snow.jpg")'
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    // openWeatherMap: how to get icon URL 
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    //Rounds number down
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity: ' + resultFromServer.main.humidity + '%';
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})