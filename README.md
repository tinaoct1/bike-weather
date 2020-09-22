# bike-weather
This app is an api server that has apis to:
1) Fetch data from [Indego GeoJSON station status API](https://www.rideindego.com/stations/json/) and [Open Weather Map API](https://openweathermap.org/current#name) to get the weather information and the stations and bike availability from Philadelphia and store in database
2) Retrieve all stations and weather info at a given time
3) Retrieve staion info and weather info at a given time for a given station Id

In addition it also has a cron that updates the weather and bike info every 1 hour.

##  The app is built in:
Backend: Nodejs(Express Framework) using Typescript

## Swagger Doc
https://bike-weather.herokuapp.com/api/v1/api-docs/
For api-key please contact me

## Database:
mongo hosted on MongoDB Atlas

## Todo: 
Backend: 
- Add unit tests
- Add data validation for function inputs parameters
- Improve error logging 
- Add Frontend to same app

## Separate frontend app
https://bike-weather-fe.herokuapp.com/
https://github.com/tinaoct1/bike-weather-frontend
