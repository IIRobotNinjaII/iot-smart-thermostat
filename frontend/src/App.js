import React, { useState, useEffect } from 'react';
import './App.css';
import logo from '../src/logo512.png';
import TemperatureBarChart from './TemperatureBarChart';

const Card = ({ sensorData }) => {
  const [showGraph, setShowGraph] = useState(false);

  const handleButtonClick = () => {
    setShowGraph(!showGraph)
  };

  return (
    <div className={`card ${showGraph ? 'expanded' : ''}`}>
      <h2 className="sensor-title">Sensor ID: {sensorData.ID}</h2>
      <p className="sensor-description">
        Temperature: {sensorData.Temperature.slice(-1)}<br />
        Humidity: {sensorData.Humidity.slice(-1)}<br />
        PM: {sensorData.PM.slice(-1)}<br />
        CO2: {sensorData.CO2.slice(-1)}<br />
        VOC: {sensorData.VOC.slice(-1)}<br />
        Thermostat: <span className={`dot ${sensorData.thermostaton ? 'green' : 'red'}`}></span><br />
        Humidifier: <span className={`dot ${sensorData.humidifieron ? 'green' : 'red'}`}></span>
      </p>
      <button className='graph-button' onClick={handleButtonClick}>Show Graph</button>
      {showGraph && <TemperatureBarChart data={sensorData} />}
    </div>
  );
};

const App = () => {
  const [sensorData, setSensorData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllAssets');
      const data = await response.json();
      // const data = 
      // [
      //     {"ID":"0002","Temperature":[30,30,32,32,32,34,37,40,43,45],"Humidity":[71,73,74,83,92,85,80,64,57,40],"Date":["2023-11-22T14:50:57.004Z","2023-11-22T14:51:02.002Z","2023-11-22T14:51:07.001Z","2023-11-22T14:51:12.114Z","2023-11-22T14:51:14.414Z","2023-11-22T14:51:16.416Z","2023-11-22T14:51:18.416Z","2023-11-22T14:51:21.417Z","2023-11-22T14:51:23.417Z","2023-11-22T14:51:26.420Z"],"PM":[66,75,83,85,85,92,89,74,69,55],"CO2":[63,69,74,79,84,89,94,88,85,74],"VOC":[402,419,429,477,527,640,721,832,809,691],"thermostaton":1,"humidifieron":0},
      //     {"ID":"0003","Temperature":[30,30,32,32,34,36,37,38,39,42],"Humidity":[71,73,74,74,74,85,90,81,67,54],"Date":["2023-11-22T14:50:56.728Z","2023-11-22T14:51:01.727Z","2023-11-22T14:51:06.726Z","2023-11-22T14:51:11.725Z","2023-11-22T14:51:14.357Z","2023-11-22T14:51:17.360Z","2023-11-22T14:51:19.361Z","2023-11-22T14:51:21.362Z","2023-11-22T14:51:24.362Z","2023-11-22T14:51:26.362Z"],"PM":[66,75,83,92,83,73,62,55,44,31],"CO2":[63,69,74,76,76,83,90,93,83,74],"VOC":[402,419,429,464,479,671,754,829,862,811],"thermostaton":1,"humidifieron":0},
      //     {"ID":"0004","Temperature":[27,29,31,31,31,33,36,40,43,44],"Humidity":[63,72,78,85,94,89,84,70,57,42],"Date":["2023-11-22T14:50:56.913Z","2023-11-22T14:51:01.909Z","2023-11-22T14:51:06.909Z","2023-11-22T14:51:11.911Z","2023-11-22T14:51:14.397Z","2023-11-22T14:51:16.397Z","2023-11-22T14:51:18.397Z","2023-11-22T14:51:21.397Z","2023-11-22T14:51:23.399Z","2023-11-22T14:51:26.400Z"],"PM":[74,76,77,77,77,84,95,84,73,57],"CO2":[61,70,78,87,96,89,84,68,61,44],"VOC":[426,522,547,589,669,796,909,704,539,465],"thermostaton":1,"humidifieron":0},
      // ]
      
      setSensorData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className='logo-container'>
          <img className='navbar-logo' src={logo} alt='logo' />
        </div>

        <div className="team-info">
          <div className="team-name">Team B-3</div>
          <div className="team-member">Devika Baid 207221</div>
          <div className="team-member">Antony Thoppil 207208</div>
          <div className="team-member">Akshat Choudhary 207204</div>
        </div>
      </nav>

      {
        //showGraphPage ? (
        //  <GraphPage />
        //) : 
        (
          <div className="card-container">
            {sensorData.map((data, index) => (
              <Card key={index} sensorData={data} />
            ))}
          </div>
        )
      }

      <button className="refresh-button" onClick={handleRefresh}>
        Refresh Data
      </button>
    </div>
  );
};

export default App;
