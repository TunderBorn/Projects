import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { searchWeather, updateWeather, updateForecast } from '../redux/actions/actions';
import Search_Icon from "../Images/Icons/search.png";
import Clear_Icon from "../Images/Icons/clear.png";
import Cloud_Icon from "../Images/Icons/cloud.png";
import Drizzle_Icon from "../Images/Icons/drizzle.png";
import Snow_Icon from "../Images/Icons/snow.png";
import Rain_Icon from "../Images/Icons/Rain.png";
import Wind_Icon from "../Images/Icons/wind.png";
import Humidity_Icon from "../Images/Icons/humidity.png";
import moment from 'moment';

function Main() {
  let api_key = "a7c18d8f0c760dc2d008770529ee33da";

   const [wicon, setWicon] = useState(Cloud_Icon);
   const [forecastData, setForecastData] = useState([]);

  // const dispatch = useDispatch();
  // const { currentWeather, forecastData } = useSelector((state) => state.weather);

  // Funzione search per trovare il file API e prendere i dati
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    // Link url dove viene modificato il nome della città se inserita
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&APPID=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();

    // // REDUX
    // dispatch(updateWeather(data.list[0]));
    // dispatch(updateForecast(data.list.slice(1, 8))); // Prendi le previsioni per i successivi 7 giorni
     
    // Tutte le Variabili rese dinamiche
     const humidity = document.getElementsByClassName("humidityPercent");
     const wind = document.getElementsByClassName("windRate");
     const temperature = document.getElementsByClassName("temp");
     const location = document.getElementsByClassName("weatherLocation");

     humidity[0].innerHTML = data.list[0].main.humidity + "%";
     wind[0].innerHTML = data.list[0].wind.speed + "km/h";
     temperature[0].innerHTML = data.list[0].main.temp + "°C";
     location[0].innerHTML = data.city.name;


    // Estrai le previsioni per i 7 giorni successivi
    const nextWeekForecast = data.list.filter(item => {
    // Imposta l'orario per tutte le previsioni del giorno successivo allo stesso valore (ad esempio, mezzanotte)
     const forecastDate = new Date(item.dt * 1000);
     forecastDate.setHours(0, 0, 0, 0);

     // Consideriamo solo le previsioni a partire dal giorno successivo
     const currentDate = new Date();
     currentDate.setHours(0, 0, 0, 0);

     return forecastDate > currentDate && forecastDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
   });

   // Raggruppa le previsioni per giorno (tenendo solo la prima previsione di ogni giorno)
   const groupedForecastData = groupForecastByDay(nextWeekForecast);
   setForecastData(groupedForecastData);
  

  // Aggiorna l'icona in base alle condizioni meteorologiche correnti
     if (data.list[0].weather[0].main === "Clear") {
       setWicon(Clear_Icon);
     } else if (data.list[0].weather[0].main === "Clouds") {
       setWicon(Cloud_Icon);
     } else if (data.list[0].weather[0].main === "Snow") {
       setWicon(Snow_Icon);
     } else if (data.list[0].weather[0].main === "Drizzle") {
       setWicon(Drizzle_Icon);
     } else if (data.list[0].weather[0].main === "Rain") {
       setWicon(Rain_Icon);
     }
  };


  // Funzione di supporto per raggruppare le previsioni per giorno
   const groupForecastByDay = (forecast) => {
     const groupedForecast = {};
     forecast.forEach(item => {
       const forecastDate = new Date(item.dt * 1000);
       forecastDate.setHours(0, 0, 0, 0);

       const key = forecastDate.toISOString();

       if (!groupedForecast[key]) {
         groupedForecast[key] = item;
       }
     });

     return Object.values(groupedForecast);
   };



  return (
    <>
    <main>
     {/* TITOLO */}
        <div>
            <h1 className="py-2">Che tempo fa in città?</h1>
        </div>


       {/* NOME CITTA' */}
       <input
        type="text"
        className="cityInput"
        placeholder="Inserisci la città"
      />


      {/* ICONA */}
      <img
        src={Search_Icon}
        alt="Search Icon"
        className="Search-Icon px-2"
        onClick={() => {
          search();
        }}
      ></img>


      {/* DIV che contiene NOME della città e orario */}
      <div>
        <h1 className="weatherLocation">Monaco</h1>
        <p className="background" id="Data">{moment().format("dddd")}, <br />
          {moment().format("LL")}</p>
      </div>
      <Container>


        {/* ROW contenente ICONA e TEMPERATURA Corrente*/}
         <Row className="background d-flex align-items-center justify-content-center my-2">
          <Col xs={6}>
            <div>
              <img src={wicon} alt=""></img>
            </div>
          </Col>
          <Col xs={6}>
            <p className="temp">47°C</p>
          </Col>
        </Row>


        {/* ROW con ICONA e DATi di Umidità e Vento */}
        <Row className="d-flex align-items-center justify-content-center my-2">
          <Col xs={4} className="background px-1 py-1 mx-1 my-2">
            <img src={Humidity_Icon} alt=""></img>
            <p className="humidityPercent">34%</p>
          </Col>
          <Col xs={4} className="background px-1 py-1 mx-1 my-2">
            <img src={Wind_Icon} alt=""></img>
            <p className="windRate">43.56 km/h</p>
          </Col>
        </Row>
        </Container>
        </main>

        
        {/* ROW che contiene Previsioni della settimana con relative ICONE e DATI */}
        <Container>
          <div className="Previsioni">
        <Row className='d-flex align-items-center justify-content-center'>
          <div className='my-2'><p className="border-bottom">Previsioni della Settimana</p></div>
          {forecastData.map((forecastDay, index) => (
            <Col className="background py-1 px-1 mx-1 my-1" key={index} xs={3}>
              <img className="next" src={getForecastIcon(forecastDay.weather[0].main)} alt=""></img>
              <p>{forecastDay.main.temp}°C</p>
            </Col>
          ))}
        </Row>
        </div>
      </Container>
    </>
  );
}

 // Funzione di supporto per ottenere l'icona in base alle condizioni meteorologiche di previsione
 const getForecastIcon = (weatherMain) => {
   switch (weatherMain) {
     case "Clear":
       return Clear_Icon;
     case "Clouds":
       return Cloud_Icon;
     case "Snow":
       return Snow_Icon;
     case "Drizzle":
       return Drizzle_Icon;
     case "Rain":
       return Rain_Icon;
     default:
       return Cloud_Icon;
   }
 };

export default Main;
