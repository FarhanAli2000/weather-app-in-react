import "./App.css";
import axios from "axios";
import { useState } from "react";

// Import images
import clearImage from "./assets/images/clear.jpeg";
import cloudImage from "./assets/images/1.jpeg";
import brokenImage from './assets/images/images.jpeg'
import overcastImage from './assets/images/4.webp'
import scatteredImage from './assets/images/5.jpg'
function App() {
  const API_KEY = "a04f6f78497022aea0ec940ff8507c33";
  const unit = "metric";
  const [city, setCity] = useState("");
  const [myData, setMyData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    if (city !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        )
        .then((response) => {
          setMyData(response.data);
          setError(null);
        })
        .catch((err) => {
          setError("City not found");
          setMyData(null);
        });
    }
  };

  const getImageForWeather = (description) => {
    if (description.includes("clear")) {
      return clearImage;
    } 
    else if (description.includes("cloud")) {
      return cloudImage;
    } 
    else if (description.includes("broken")){
      return brokenImage;
    }
    else if(description.includes("overcast")){
      return overcastImage;
    }
    else if(description.includes('scattered')){
      return  scatteredImage;
    }
    else {
      return "farhan"; 
    }
  };

  return (
    <div className="App">
      <h1>Weather App with React</h1>
      <h4>I make this App in react by using axios api method.</h4>
      <input className="my-inp"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn" onClick={fetchData}>
        Submit
      </button>
      {myData && (
        <div>
          <h2>Weather in {myData.name}</h2>
          <p>Temperature: {myData.main.temp}°C</p>
          <p>Weather: {myData.weather[0].description}</p>
          <img
            src={getImageForWeather(myData.weather[0].description)}
            alt={myData.weather[0].description}
            height='150px'
            width='50%'
          />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
