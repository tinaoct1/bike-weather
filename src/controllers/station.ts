import Station, { IStation } from '../models/station';
import { CreateQuery } from 'mongoose';
import axios from 'axios';

// async function CreateOrUpdate({
//     email,
//     firstName,
//     lastName,
//     gender,
//     address
// }: CreateQuery<IStation>): Promise<IStation> {
//     return await Station.createOrUpdate({
//         email,
//         gender,
//         firstName,
//         lastName,
//         address
//     })
// }

async function BulkInsert(data: any[]) {
    return await Station.insertMany(data)
}

async function GetFromIndego() {
    try {
        const {data} = await axios.get("https://kiosks.bicycletransit.workers.dev/phl")
        return data.features
    } catch (e) {
        console.log(e)
    }
}

export default {
    // CreateOrUpdate,
    BulkInsert,
    GetFromIndego
};