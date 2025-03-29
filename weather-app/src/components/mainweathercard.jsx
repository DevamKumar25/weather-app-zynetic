import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Hot weather icon
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Cold weather icon
import CloudIcon from "@mui/icons-material/Cloud"; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = parseFloat(weatherData?.main?.temp) || 0; // Ensure it's a number
  const weatherDescription =
    weatherData?.weather?.[0]?.description || "Weather data not available";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  // Determine the correct weather icon
  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon style={styles.iconStyle("orange")} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon style={styles.iconStyle("blue")} />;
    } else {
      return <CloudIcon style={styles.iconStyle("gray")} />;
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.nowText}>Now</div>
      <div style={styles.temperatureContainer}>
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
      </div>
      <div style={styles.descriptionText}>{weatherDescription}</div>
      <div style={{ marginTop: "1rem" }}>
        <div style={styles.infoRow}>
          <CalendarMonthIcon />
          {currentDate}
        </div>
        <div style={styles.infoRow}>
          <LocationOnIcon />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};


const styles = {
  cardContainer: {
    color: "white",
    borderRadius: "0.5rem",
    width: "180px",
    padding: "30px",
    backgroundColor: "#4B5563",
  },
  nowText: {
    fontSize: "20px",
  },
  temperatureContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "35px",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: "15px",
    marginTop: "8px",
    fontWeight: "50",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "4px",
  },
  iconStyle: (color) => ({
    marginLeft: "10px",
    fontSize: "3rem",
    color: color,
  }),
};

export default MainWeatherCard;
