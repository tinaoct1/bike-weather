import axios from 'axios';
import app from '../../src/app';
import request from "supertest";
import StationController from '../../src/controllers/station';
import WeatherController from '../../src/controllers/weather';

describe("When the indego-data-fetch-and-store-it-db is called", () => {
    it("should throw forbidden error if the api-token is not passed", async () => {
        const res = await request(app).post('/api/v1/indego-data-fetch-and-store-it-db')
        expect(res.statusCode).toEqual(403)
    })

    it("should throw not found error when a non-existent api is called", async () => {
        const res = await request(app).post('/api/v1/this-api-is-not-defined')
        expect(res.statusCode).toEqual(404)
    })

    axios.get = jest.fn().mockImplementation(() => {
        throw new Error();
    });

    it("should throw an internal server error when the indego/openMapWeather api throws an error", async () => {
        const res = await request(app).post('/api/v1/indego-data-fetch-and-store-it-db')
            .set('api-token', "dev-123")
        expect(res.statusCode).toEqual(500)
    })

    axios.get = jest.fn().mockResolvedValue({});

    it("should throw an internal server error when the apis don't return the expected response format", async () => {
        const res = await request(app).post('/api/v1/indego-data-fetch-and-store-it-db')
            .set('api-token', "dev-123")
        expect(res.statusCode).toEqual(500)
    })


    it("should throw a 200 when the 3rd party apis return as expected", async () => {
        axios.get = jest.fn().mockResolvedValue({data: {}});
        StationController.BulkInsert = jest.fn().mockResolvedValue({});
        WeatherController.Create = jest.fn().mockResolvedValue({})
        const res = await request(app).post('/api/v1/indego-data-fetch-and-store-it-db')
            .set('api-token', "dev-123")
        expect(res.statusCode).toEqual(200)
    })

})

describe("When the /stations api is called", () => {
    it("should throw an error if the api token is not passed", async () => {
        const res = await request(app).get('/api/v1/stations')
        expect(res.statusCode).toEqual(403)
    })

    it("should throw an error if no at query params is passed", async () => {
        const res = await request(app).get('/api/v1/stations')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(400)
    })


    it("should return 404 if no data is obtained for the requested time", async () => {
        WeatherController.Get = jest.fn().mockResolvedValue([])
        const res = await request(app).get('/api/v1/stations?at=2020-12-10T00:00:00')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(404)
    })


    it("should return 200 with correct response format if data is obtained for the requested time", async () => {
        WeatherController.Get = jest.fn().mockResolvedValue([{test:123}])
        StationController.Get = jest.fn().mockResolvedValue([{test:123}]);
        const res = await request(app).get('/api/v1/stations?at=2020-12-10T00:00:00')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('at')
        expect(res.body).toHaveProperty('stations')
        expect(res.body).toHaveProperty('weather')
    })
})

describe("when the /stations/:kioskId api is called", () => {
    it("should throw an error if the api token is not passed", async () => {
        const res = await request(app).get('/api/v1/stations/123')
        expect(res.statusCode).toEqual(403)
    })

    it("should throw an error if no at query params is passed", async () => {
        const res = await request(app).get('/api/v1/stations')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(400)
    })

    it("should return 404 if no data is obtained for the requested time", async () => {
        WeatherController.Get = jest.fn().mockResolvedValue([])
        StationController.Get = jest.fn().mockResolvedValue([{test:123}]);

        const res = await request(app).get('/api/v1/stations/123?at=2020-12-10T00:00:00')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(404)
    })

    it("should return 200 with correct response format if data is obtained for the requested time", async () => {
        WeatherController.Get = jest.fn().mockResolvedValue([{test:123}])
        StationController.Get = jest.fn().mockResolvedValue([{test:123}]);
        const res = await request(app).get('/api/v1/stations/123?at=2020-12-10T00:00:00')
            .set('api-token', "dev-123")

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('at')
        expect(res.body).toHaveProperty('stations')
        expect(res.body).toHaveProperty('weather')
    })

})