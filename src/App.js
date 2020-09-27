import React, {Component} from 'react';
import './App.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

const PLACES = [{
    name: "Ульяновск",
    zip: "432000"
  },
  {
    name: "Димитровград",
    zip: "433500"
  },
  {
    name: "Новоульяновск",
    zip: "433300"
  },
  {
    name: "Ундоры",
    zip: "433340"
  }
];
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",ru&appid=a16966a3c44261ccd0ddc5da1be8b926&lang=ru&units=metric";
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
          {weather.description} в {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Текущая t°: {weatherData.main.temp}°C</p>
        <p>Максимальная t°: {weatherData.main.temp_max}°C</p>
        <p>Минимальная t°: {weatherData.main.temp_min}°C</p>
        <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar bg='dark' variant='dark'>
              <Navbar.Brand>React Simple Weather App</Navbar.Brand>
        </Navbar>
        <br />
        <Container>
          <Row>
              <Col md={4} sm={4}>
                <h5>Выберите населенный пункт</h5>
                <Nav className='flex-column'
                  variant='pills'
                  stacked
                  ActiveKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}>
                  {PLACES.map((place, index) => (
                    <Nav.Item > <Nav.Link eventKey={index}>{place.name}</Nav.Link></Nav.Item>
                      ))}
                </Nav>
              </Col>
              <Col md={8} sm={8}>
                <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
              </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
