
// import { TRoutesInput } from '../types/routes';
import StationController from '../controllers/station';
import WeatherController from '../controllers/weather';
import moment from 'moment';

// export default ({ app }: TRoutesInput) => {
//     app.post('/api/v1/indego-data-fetch-and-store-it-db', async (req, res) => {
//         const startOfHourDate = moment().startOf('hour')
//
//         console.log("Fetching Stations From Indego")
//         const [stations, weather] = await Promise.all([StationController.GetFromIndego(),
//             WeatherController.GetWeatherInfo()])
//
//         console.log("Inserting Into DB")
//
//         await Promise.all([StationController.BulkInsert(stations, startOfHourDate), WeatherController.Create(weather, startOfHourDate)])
//
//         return res.send('ok');
//     });
//
//     app.get('api/v1/stations', async (req, res) => {
//         const at = moment((req.query as any).at)
//         console.log(`Fetching stations and weather at ${at}`)
//         const [stations, weather] = await Promise.all([StationController.Get({at}), WeatherController.Get(at)])
//         if (!stations || !weather) {
//             res.send(404)
//         }
//
//         res.send({at, stations, weather})
//     })
//
//     app.get('api/v1/stations/:kioskId', async (req, res) => {
//         const at = moment((req.query as any).at)
//
//         const kioskId = req.params.kioskId
//         console.log(`Fetching station: ${kioskId} and weather at ${at}`)
//         const [station, weather] = await Promise.all([StationController.Get({at, kioskId}), WeatherController.Get(at)])
//         if (!station || !weather) {
//             res.send(404)
//         }
//
//         res.send({at, station, weather})
//     })
// };

import { Router } from 'express';

const router: Router = Router();


router.post('/indego-data-fetch-and-store-it-db', async (req, res) => {
    const startOfHourDate = moment().startOf('hour')

    console.log("Fetching Stations From Indego")
    const [stations, weather] = await Promise.all([StationController.GetFromIndego(),
        WeatherController.GetWeatherInfo()])

    console.log("Inserting Into DB")

    await Promise.all([StationController.BulkInsert(stations, startOfHourDate), WeatherController.Create(weather, startOfHourDate)])

    return res.send('ok');
});

router.get('/stations', async (req, res) => {
    const at = new Date(`${(req.query as any).at}.000Z`)
    console.log(`Fetching stations and weather at ${at}`)
    const [stations, weather] = await Promise.all([StationController.Get({at}), WeatherController.Get(at)])
    if (!stations || !weather) {
        res.send(404)
    }

    res.send({at, stations, weather})
});

router.get('/stations/:kioskId', async (req, res) => {
    const at = new Date(`${(req.query as any).at}.000Z`)

    const kioskId = req.params.kioskId
    console.log(`Fetching station: ${kioskId} and weather at ${at}`)
    const [station, weather] = await Promise.all([StationController.Get({at, kioskId}), WeatherController.Get(at)])
    if (!station || !weather) {
        res.send(404)
    }

    res.send({at, station, weather})
})


export const MainRouter: Router = router;