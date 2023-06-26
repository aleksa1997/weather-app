import sunnyBG from "./assets/sunny.jpg";
import coldBG from "./assets/cold-img.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormaredWeatherData } from "./weatherServices";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(sunnyBG);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormaredWeatherData(city, units);
      setWeather(data);

      const changeBg = units === "metric" ? 20 : 60;
      if (data.temp <= changeBg) {
        setBg(coldBG);
      } else {
        setBg(sunnyBG);
      }
    };
    fetchWeatherData();
  }, [units, city]);

  const changeUnits = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const Celsius = currentUnit === "C";
    button.innerText = Celsius ? "°F" : "°C";
    setUnits(Celsius ? "metric" : "imperial");
  };

  const inputText = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section-inputs">
              <input
                onKeyDown={inputText}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => changeUnits(e)}>°F</button>
            </div>
            <div className="section section-temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt="weather" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/*Description*/}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
