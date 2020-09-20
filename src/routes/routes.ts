
import { TRoutesInput } from '../types/routes';
import StationController from '../controllers/station';

export default ({ app }: TRoutesInput) => {
    app.post('/api/v1/indego-data-fetch-and-store-it-db', async (req, res) => {
        console.log("Fetching Stations From Indego")
        const stations = await StationController.GetFromIndego()

        console.log("Inserting Into DB")

        await StationController.BulkInsert(stations)

        return res.send('ok');
    });

    app.get('api/v1/stations', async (req, res) => {
        //fetch
    })

    app.get('api/v1/stations/:kioskId')
};