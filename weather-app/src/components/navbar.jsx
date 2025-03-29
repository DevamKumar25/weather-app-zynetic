import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import { Grid, Tooltip, useMediaQuery } from "@mui/material";

const Navbar = ({ onSearch, onRefresh, city }) => {
  const [searchCity, setSearchCity] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        flexWrap: "wrap",
        padding: "10px 20px",
        gap: isMobile ? "15px" : "30px", 
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0, 
        }}
      >
        <FilterDramaTwoToneIcon fontSize="large" />
        <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>
          Weather
        </p>
      </div>

      {/* Search Bar + Buttons */}
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent={isMobile ? "center" : "flex-start"}
        style={{ maxWidth: "900px", width: "100%", flexGrow: 1 }}
      >
        <Grid item xs={12} sm={8}>
          <TextField
            variant="outlined"
            placeholder="Search city 'Sasaram'"
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: "white",
              borderRadius: "2rem",
            }}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearchClick}
            style={{ borderRadius: "6px", backgroundColor: "#4B5550" }}
          >
            Search
          </Button>
        </Grid>

        {/* Refresh Button with Tooltip */}
        <Grid item xs={6} sm={2}>
          <Tooltip title="Refresh" arrow>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onRefresh(city)}
              style={{ borderRadius: "6px", backgroundColor: "#4B5550" }}
            >
              🔄
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </nav>
  );
};

export default Navbar;
