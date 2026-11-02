let searchInput = document.getElementById("search_input")
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_day_month")
let todayLocation = document.getElementById("today_city")
let todayTemp = document.getElementById("today_temperature")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("today_humidity")
let wind = document.getElementById("today_wind")
let windDirection = document.getElementById("wind_direction")


let nextDay = document.getElementsByClassName("next-day")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextConditionImg = document.getElementsByClassName("next-day-img")
let nextConditionText = document.getElementsByClassName("next-condition")





async function getWeatherData(cityName) {

    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=de32360ffef148a8a8465453262910&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


function displayTodayData(data) {
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us", { weekday: "long" })
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", { month: "long" })
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    document.querySelector("#today_condition_img img").src =
        `https:${data.current.condition.icon}`;
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "kph"
    windDirection.innerHTML = data.current.wind_dir
}


function displayNextData(data) {

    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i + 1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: "long" })
        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
        nextConditionImg[i].querySelector("img").src =
            `https:${forecastData[i + 1].day.condition.icon}`;
        nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text

    }

}





async function startApp(city = "cairo") {
    let weatherData = await getWeatherData(city)
    if (!weatherData.error) {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}

startApp()


searchInput.addEventListener("input", function () {
    startApp(searchInput.value)


})
