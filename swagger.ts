export const swaggerDocument = {
    "openapi": '3.0.1',
    "info": {
        "description": "Get a historical snapshot of bike stations and weather conditions in Philadelphia",
        "version": "1.0.0",
        "title": "Bike and Weather",
        "contact": {
            "email": "tinaoct1@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "bike-weather.herokuapp.com",
    "paths": {
        "/api/v1/stations": {
            "get": {
                "tags": [
                    "stations-and-weather"
                ],
                "summary": "Get a snapshot of stations and weather",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "at",
                        "in": "query",
                        "description": "The time for which the historical data has to be obtained in UTC format eg:2020-09-21T07:00:00",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success"
                    },
                    "404": {
                        "description": "Data not found"
                    }
                }
            }
        },
        "/api/v1/stations/{kioskId}": {
            "get": {
                "tags": [
                    "station-and-weather"
                ],
                "summary": "Get station and weather details by kioskId",
                "description": "Returns a single station",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "kioskId",
                        "in": "path",
                        "description": "ID of kiosk to fetch",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    },
                    {
                        "name": "at",
                        "in": "query",
                        "description": "The time for which the historical data has to be obtained in UTC format eg:2020-09-21T07:00:00",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "404": {
                        "description": "Kiosk not found"
                    }
                }
            }
        },
        "/api/v1/indego-data-fetch-and-store-it-db": {
            "post": {
                "tags": [
                    "create-snapshot-of-weather-and-stations"
                ],
                "summary": "Creates a snapshot of the weather and stations info at the time this api is called",
                "description": "",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "default": {
                        "description": "successful operation"
                    }
                }
            }
        }
    },
    "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
    }
}