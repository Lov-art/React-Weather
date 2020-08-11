import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather-info";

const API_KEY = "bc53876278cd521629ac8587bc37d131";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await api_url.json();

      let sunriseInSec = data.sys.sunrise;
      let date_sunrise = new Date(sunriseInSec * 1000);
      let timeSunrise = date_sunrise.toLocaleTimeString();

      let sunsetInSec = data.sys.sunset;
      let date = new Date(sunsetInSec * 1000);
      let timeSunset = date.toLocaleTimeString();

      this.setState({
        temp: Math.round(data.main.temp - 273),
        city: data.name,
        country: data.sys.country,
        sunrise: timeSunrise,
        sunset: timeSunset,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите название города",
      });
    }
  };

  render() {
    return (
      <div className='wrapper'>
         <div className = 'main'>
          <div className="container">
            <div className="row">
              <div className='col-sm-5 info'>
                <Info />
              </div>
              <div className = 'col-sm-7 form'>
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp + '°C'}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
         </div>
      </div>
    );
  }
}

export default App;
