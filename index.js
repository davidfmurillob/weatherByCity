//Principal selectors
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const form = document.querySelector("#form-id");

//Events
window.addEventListener("load", () => {
  form.addEventListener("submit", weatherSearch);
});

function weatherSearch(e) {
  e.preventDefault();

  console.log("Buscando el clima");

  const city = document.querySelector("#cityInput").value;
  const country = document.querySelector("#country").value;

  console.log(city);
  console.log(country);

  //Form validation
  if (city === "" || country === "") {
    showError("Both fields are required");
  }

  //Checking the API
  checkingApi(city, country);
}

function showError(message) {
  //Checking if alert already exist
  const alert = document.querySelector(".alert-form");
  if (!alert) {
    // Creating alert

    const alert = document.createElement("div");

    alert.classList.add("alert-form");

    alert.innerHTML = `
    <p>${message}</p>

    `;
    container.appendChild(alert);

    //Removing alert after some seconds
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}

function checkingApi(city, country) {
  const key = "8472107f6cdaddcdf0d2e0c6daf774ad";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`;

  spinner();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cleanHTML();
      if (data.cod === "404") {
        showError("City not found");
        return;
      }

      //Imprime la respuesta en el HTML

      showWeather(data);
    });
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const centigrades = kelvinToCentigrades(temp);
  const max_centigrades = kelvinToCentigrades(temp_max);
  const min_centigrades = kelvinToCentigrades(temp_min);

  const actualWeather = document.createElement("p");
  actualWeather.classList.add("actual-weather");
  actualWeather.innerHTML = `
    ${centigrades} &#8451
    `;

  const cityName = document.createElement("p");
  cityName.classList.add("city-name");
  cityName.innerHTML = `The weather in ${name} is: 
    `;
  const maxTemp = document.createElement("p");
  maxTemp.classList.add("max-temp");
  maxTemp.innerHTML = `
  Max temperature: ${max_centigrades} &#8451 
  `;
  const minTemp = document.createElement("p");
  minTemp.classList.add("min-temp");
  minTemp.innerHTML = `
  Min temperature: ${min_centigrades} &#8451 
  `;

  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("div-weather");
  weatherDiv.appendChild(cityName);
  weatherDiv.appendChild(actualWeather);
  weatherDiv.appendChild(maxTemp);
  weatherDiv.appendChild(minTemp);

  result.appendChild(weatherDiv);
}

function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

// helper function
const kelvinToCentigrades = (temp) => parseInt(temp - 273.15);

function spinner() {
  cleanHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `;

  result.appendChild(spinner);
}
