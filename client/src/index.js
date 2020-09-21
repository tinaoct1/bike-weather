import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';

function App() {
	const [stations, setBooks] = useState(null);
	
	const fetchData = async () => {
		const response = await axios.get(
			'http://localhost:3000/api/v1/stations?at=2020-09-21T07:00:00',
			{
				headers: {
					"api-token": "dev-123",
					'Content-Type': 'application/json',
				}
			}
		);
		
		setBooks(response.data.stations);
	};
	
	return (
		<div className="App">
		<h1>Bikes Availability</h1>
	
	<div>
	<button className="fetch-button" onClick={fetchData}>
		Fetch Data
	</button>
	<br />
	</div>
	
	{/* Display data from API */}
	<div className="stations">
		{stations &&
		stations.map((station, index) => {
			const cleanedDate = new Date(station.released).toDateString();
			// const authors = book.authors.join(', ');
			
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
