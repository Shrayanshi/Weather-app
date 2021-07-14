let weather = {
    apiKey: "611d96ab9188676e99c2d3d5e6473660",
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icons").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
}
const show = document.querySelector(".search button");
show.addEventListener("click", function() {
    weather.search();
})
document.querySelector(".searchBar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})
weather.fetchWeather("Tokyo");
