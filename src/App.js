import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";

const PLACES = [{
    name: "Ulyanovsk",
    zip: "432000"
  },
  {
    name: "Dimitrovgrad",
    zip: "433502"
  },
  {
    name: "Novoulyanovsk",
    zip: "433300"
  },
  {
    name: "Undory",
    zip: "433340"
  }
];
class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      ",ru&appid=a16966a3c44261ccd0ddc5da1be8b926";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <Navbar>
              React Simple Weather App
        </Navbar>
        <Container-fluid>
          <Row>
              <Col md={4} sm={4}>
                <h3>Select a city</h3>
                {PLACES.map((place, index) => (
                  <button key={index} onClick={() => {
                    this.setState({ activePlace: index });
                  }}>{place.name}</button>
                ))}
              </Col>
              <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
              </Col>
          </Row>
        </Container-fluid>
      </div>
    );
  }
}

export default App;
