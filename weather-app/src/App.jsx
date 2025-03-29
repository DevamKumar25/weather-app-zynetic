import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Sasaram"); // Default city
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = async (lat, lon) => {
    try {
      const API_KEY = "bd184b0d35b48336f2cf50fcfe07b149";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(response.data.list[0]);
    } catch (error) {
      setError("Failed to fetch air quality data.");
    }
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null); 

    try {
      const API_KEY = "bd184b0d35b48336f2cf50fcfe07b149";

      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found"); // Handle invalid city
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      fetchAirQualityData(weatherData.coord.lat, weatherData.coord.lon);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastResponse.data);
    } catch (error) {
      setWeatherData(null); // Ensure previous data is cleared on error
      setAirQualityData(null);
      setFiveDayForecast([]);

      if (error.message === "City not found") {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("Failed to fetch weather data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onRefresh={fetchWeatherData}
        city={city}
      />

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Show Loading Indicator */}
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "white" }}>
          Loading...
        </p>
      ) : (
        weatherData &&
        airQualityData && (
          <div
            style={{
              display: "flex",
              padding: "30px",
              gap: "10px",
            }}
          >
            <div
              style={{ flex: "0.4", marginRight: "10px" }}
            >
              <MainWeatherCard weatherData={weatherData} />
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
              >
                5 Days Forecast
              </p>
              {fiveDayForecast && (
                <FiveDayForecast forecastData={fiveDayForecast} />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "0.5",
                gap: "20px",
              }}
            >
              <TodayHighlights
                weatherData={weatherData}
                airQualityData={airQualityData}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDashboard;
