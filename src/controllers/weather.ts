import Weather from '../models/weather'
import axios from 'axios';
// import * as moment from "moment";


async function GetWeatherInfo() {
    const APIKey = "f221911ecaf99e13c117da4eb5794fb6"
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${APIKey}`)
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