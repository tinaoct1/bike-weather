import Station, { IStation } from '../models/station';
import axios from 'axios';
import * as moment from "moment";


async function BulkInsert(data: any[], at: moment.Moment) {
    data = data.map(station => ({...station, at}))
    return await Station.insertMany(data)
}

async function GetFromIndego() {
    const {data} = await axios.get("https://kiosks.bicycletransit.workers.dev/phl")
    return data.features
}

async function Get(query: {at: Date, kioskId?: string}) {
    if (query.kioskId) {
        return await Station.find({at: query.at, "properties.id": parseInt(query.kioskId)})
    }
    return await Station.find(query)
}

export default {
    BulkInsert,
    GetFromIndego,
    Get
};