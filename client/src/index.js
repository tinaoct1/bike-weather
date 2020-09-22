import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import './styles.css';
import {}

function App() {
	const [stations, setStations] = useState(null);
	const [at, setAt] = useState(null);
	const [kioskId, setKioskId] = useState(null);
	const fetchData = async () => {
		const url
		const response = await axios.get(
			`http://localhost:3000/api/v1/stations?at=${at}`,
			{
				headers: {
					"api-token": "dev-123",
					'Content-Type': 'application/json',
				}
			}
		);
		
		setStations(response.data);
	};
	
	const setTime = (a) => {
		setAt(a)
	}
	
	
	
	return (
		<div className="App">
		<h1>Bikes Availability</h1>
	
	<div>
	
		<div>
	<label>
	Time:
<input onChange={event => setTime(event.target.value)} />

		</label>
		</div>
		
		<br />
		
		<button className="fetch-button" onClick={fetchData}>
		Fetch Data
	</button>
		
	<br />
	</div>
	
	{/* Display data from API */}
	<div className="at"> {stations && moment(stations.at).format('LLL')}</div>
	<div className="weather"> {stations && stations.weather.weather[0].description}</div>
	<div className="stations">
		{stations &&
		stations.stations.map((station, index) => {
			return (
				<div className="station" key={index}>
				<h3>Station {index + 1}</h3>
			<h2>{station.properties.name}</h2>
			<div className="details">
				<p>Bikes Available: {station.properties.bikesAvailable}</p>
				<p>Address: {station.properties.addressStreet}</p>
			</div>
			</div>
			);
		})}
</div>
	
		</div>
);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
