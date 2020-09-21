import StationController from '../controllers/station';
import WeatherController from '../controllers/weather';
import moment from 'moment';
import { Router } from 'express';
import {swaggerDocument} from "../../swagger";
const swaggerUi = require('swagger-ui-express');
const router: Router = Router();
import {authorize} from "../utilities/authz";



router.post('/indego-data-fetch-and-store-it-db', authorize, async (req, res) => {
    const startOfHourDate = moment().startOf('hour')

    console.log("Fetching Stations From Indego")
    const [stations, weather] = await Promise.all([StationController.GetFromIndego(),
        WeatherController.GetWeatherInfo()])

    console.log("Inserting Into DB")

    await Promise.all([StationController.BulkInsert(stations, startOfHourDate), WeatherController.Create(weather, startOfHourDate)])

    return res.send('ok');
});

router.get('/stations', authorize, async (req, res) => {
    const at = new Date(`${(req.query as any).at}.000Z`)
    console.log(`Fetching stations and weather at ${at}`)
    const [stations, weather] = await Promise.all([StationController.Get({at}), WeatherController.Get(at)])
    if (!stations || !weather) {
        res.send(404)
    }

    res.send({at, stations, weather})
});

router.get('/stations/:kioskId', authorize, async (req, res) => {
    const at = new Date(`${(req.query as any).at}.000Z`)

    const kioskId = req.params.kioskId
    console.log(`Fetching station: ${kioskId} and weather at ${at}`)
    const [station, weather] = await Promise.all([StationController.Get({at, kioskId}), WeatherController.Get(at)])
    if (!station || !weather) {
        res.send(404)
    }

    res.send({at, station, weather})
})

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('*', (req, res) => {
    res.send({message: "Not Found"}).status(404);
});

export const MainRouter: Router = router;