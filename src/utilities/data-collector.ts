import axios from 'axios';
import {API_HOST, API_TOKEN} from './secrets'

export async function collectData() {
    await axios.post(`${API_HOST}/indego-data-fetch-and-store-it-db`, {
        'Content-Type': 'application/json',
        'api-key': API_TOKEN
    })
}