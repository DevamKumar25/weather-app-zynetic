import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  // Ensure forecastData exists and has the required structure
  if (!forecastData || !forecastData.list) {
    return <p style={{ color: "white" }}>No forecast data available.</p>;
  }

  // Function to format date as "DD Mon"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  // Extract unique daily forecasts (first instance of each day)
  const dailyForecast = [];
  const seenDates = new Set();

  forecastData.list.forEach((item) => {
    const day = formatDate(item.dt_txt);
    if (!seenDates.has(day)) {
      seenDates.add(day);
      dailyForecast.push(item);
    }
  });

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        width: "200px",
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingTop: "15px",
        paddingBottom: "5px",
      }}
    >
      {dailyForecast.slice(0, 5).map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {Math.round(item.main.temp)}°c
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {formatDate(item.dt_txt)}
            </div>
          </div>
          <div>
            {/* Display Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          {/* <div>
            <div style={{ fontSize: "15px" }}>
              {item.weather[0].description}
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
