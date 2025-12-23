// # Scenario 1 — Weather Dashboard with Error Handling

// Build a small weather dashboard that fetches current weather data from a public weather API (e.g., OpenWeatherMap).

// ### Requirements

// - Make the API request asynchronously using `fetch` with `async/await`.
// - Handle API request failures (for example, invalid city name) using `try/catch`.
// - Create and throw custom errors based on weather conditions (e.g., extremely high or low temperature) and handle them appropriately.

// ### Suggested tasks

// - Build a simple UI to input a city name and display the result.
// - Show user-friendly error messages for network errors, invalid input, or API errors.
// - Demonstrate at least one custom thrown error (e.g., `ExtremeTemperatureError`) and handle it in the UI.

// ---




const btn = document.getElementById("btn");
const cityInput = document.getElementById("cityInput");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const warningEl = document.getElementById("warning");

async function getWeather(city) {
    const apiKey = "a2ecf3b7f354a1827affeda4314f8998";

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json();
    const temp = data.main.temp;

    return {
        city: data.name,
        temp,
        description: data.weather[0].description,
        isTooCold: temp < 0,
        isTooHot: temp > 40
    };
}

btn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) return;

    try {
        warningEl.innerText = "";

        const result = await getWeather(city);

        cityEl.innerText = result.city;
        tempEl.innerText = `${result.temp}°C`;
        descEl.innerText = result.description;

        if (result.isTooCold) {
            warningEl.innerText = "❄️ Too cold outside!";
        } 
        else if (result.isTooHot) {
            warningEl.innerText = "🔥 Too hot outside!";
        }

    } catch (error) {
        cityEl.innerText = "";
        tempEl.innerText = "";
        descEl.innerText = "";
        warningEl.innerText = error.message;
    }
});

