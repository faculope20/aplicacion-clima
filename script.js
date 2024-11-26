const urlBase= `https://api.openweathermap.org/data/2.5/weather`
const API_KEY= 'd361fcf89bce142aa66f3bff25267866'
const diffKelvin = 273.15

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city)
    }else{
        alert('Ingrese una ciudad valida')
    }
})

function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => showWeatherData(data))
}

function showWeatherData(data){
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''

    const cityName = data.name 
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const tempMin = data.main.temp_min
    const tempMax = data.main.temp_max
    const icon = data.weather[0].icon
    const feelsLike = data.main.feels_like

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `La temperatura es ${Math.floor(temp-diffKelvin)}°C`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const icoInfo = document.createElement('img')
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const maxMinInfo = document.createElement('p')
    maxMinInfo.textContent = `La temperatura maxima de hoy es ${Math.floor(tempMax-diffKelvin)}°C y la temperatura minima de hoy es ${Math.floor(tempMin-diffKelvin)}°C`

    const sensacionTermInfo = document.createElement('p')
    sensacionTermInfo.textContent = `Sensacion termica: ${Math.floor(feelsLike-diffKelvin)}°C`

    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(icoInfo)
    divResponseData.appendChild(maxMinInfo)   
    divResponseData.appendChild(sensacionTermInfo) 
}