// Get the current date
let now = new Date();

let time = document.querySelector(".date");
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let paddedHours = hour.toString().padStart(2, "0");
let minute = now.getMinutes();
let paddedMinute = minute.toString().padStart(2, "0");

time.innerHTML = `${day} ${date}, ${month} ${paddedHours}:${paddedMinute}`;

// Display City

// Capitalize first letter of a string
function capitalize(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let form = document.querySelector("#form-text");
let city = document.querySelector("#city");

// Section to update city name and weather details
let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
let apiUrl = "";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formInput = document.querySelector("#form-input");
  let newFormInput = formInput.value.trim().toLowerCase();

  // Capitalize the first letter of the city name
  let capitalizedCity = capitalize(newFormInput);

  city.innerHTML = capitalizedCity;

  // Update the apiUrl with the correct capitalized city
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizedCity}&appid=${apiKey}&units=metric`;

  // Make API call here using the updated apiUrl

  axios.get(apiUrl).then(function (response) {
    let temp = document.querySelector("#current-temp");
    let description = document.querySelector("#description");

    let roundedTemp = Math.round(response.data.main.temp);
    temp.innerHTML = `${roundedTemp}<sup class="smaller">°C</sup>`; // Add the degree symbol as superscript
    description.innerHTML = capitalize(response.data.weather[0].description);

    // Set the icon image source
    let mainIcon = document.querySelector("#mainCityIcon");
    mainIcon.src = `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
    mainIcon.alt = response.data.weather[0].description;

    // Set the humidity
    let humidity = document.querySelector("#humidity");

    let humidityValue = response.data.main.humidity;

    humidity.innerHTML = `Humidity: ${humidityValue} %`;

    // Set the wind

    let wind = document.querySelector("#wind");

    let windSpeed = response.data.wind.speed;
    wind.innerHTML = `Wind: ${windSpeed} km/h`;
  });
});
