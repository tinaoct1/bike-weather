import Weather from '../models/weather'
import axios from 'axios';
import {OPEN_WEATHER_MAP_APIKEY } from "../utilities/secrets";



async function GetWeatherInfo() {
    const APIKey = ""
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${OPEN_WEATHER_MAP_APIKEY}`)
    return data
}

async function Create(data: object, at: moment.Moment) {
    return await Weather.create({...data, at})
}

async function Get(time: Date) {
    return await Weather.find({at: time})
}

export default {
    GetWeatherInfo,
    Create,
    Get
}