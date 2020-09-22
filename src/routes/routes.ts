import StationController from '../controllers/station';
import WeatherController from '../controllers/weather';
import moment from 'moment';
import { Router } from 'express';
import { swaggerDocument } from '../../swagger';
const swaggerUi = require('swagger-ui-express');
const router: Router = Router();
import { authorize } from '../utilities/authz';

router.post(
  '/indego-data-fetch-and-store-it-db',
  authorize,
  async (req, res) => {
    try {
      const startOfHourDate = moment().startOf('hour');

      const [stations, weather] = await Promise.all([
        StationController.GetFromIndego(),
        WeatherController.GetWeatherInfo(),
      ]);

      await Promise.all([
        StationController.BulkInsert(stations, startOfHourDate),
        WeatherController.Create(weather, startOfHourDate),
      ]);

      return res.send('ok');
    } catch (e: any) {
      return res.status(500).send('Something went wrong');
    }
  }
);

router.get('/stations', authorize, async (req, res) => {
  try {
    if (!(req.query as any).at) {
      return res.status(400).send("query param 'at' needs to be passed");
    }

    const at = new Date(`${(req.query as any).at}.000Z`);

    const [stations, weather] = await Promise.all([
      StationController.Get({ at }),
      WeatherController.Get(at),
    ]);
    if (!stations || !weather || !stations.length || !weather.length) {
      return res.status(404).send('Snapshot not found for requested time');
    }

    res.send({ at, stations, weather: weather[0] });
  } catch (e: any) {
    return res.status(500).send('Something went wrong');
  }
});

router.get('/stations/:kioskId', authorize, async (req, res) => {
  try {
    if (!(req.query as any).at) {
      return res.status(400).send("query param 'at' needs to be passed");
    }

    const at = new Date(`${(req.query as any).at}.000Z`);

    const kioskId = req.params.kioskId;

    const [station, weather] = await Promise.all([
      StationController.Get({ at, kioskId }),
      WeatherController.Get(at),
    ]);

    if (!station || !weather || !station.length || !weather.length) {
      return res
        .status(404)
        .send('Snapshot not found for requested time and kiosk');
    }

    res.send({ at, stations: station, weather: weather[0] });
  } catch (e: any) {
    return res.status(500).send('Something went wrong');
  }
});

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('*', (req, res) => {
  res.status(404).send('Not Found!');
});

export const MainRouter: Router = router;
