export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'Bike and Weather',
    description:
      'Get a historical snapshot of bike stations and weather conditions in Philadelphia',
    contact: {
      email: 'tinaoct1@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0.0',
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
  servers: [
    {
      url: '/bike-weather.herokuapp.com/',
    },
  ],
  paths: {
    '/api/v1/stations': {
      get: {
        tags: ['stations-and-weather'],
        summary: 'Get a snapshot of stations and weather',
        parameters: [
          {
            name: 'at',
            in: 'query',
            description:
              'The time for which the historical data has to be obtained in UTC format eg:2020-09-21T07:00:00',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'api-token',
            in: 'header',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successfully fetched stations and weather',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    stations: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/station',
                      },
                    },
                    weather: {
                      $ref: '#/components/schemas/weather',
                    },
                    at: {
                      $ref: '#/components/schemas/at',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '403': {
            description: 'Forbidden(api-token not passed)',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/stations/{kioskId}': {
      get: {
        tags: ['station-and-weather'],
        summary: 'Get station and weather details by kioskId',
        description: 'Returns a single station',
        parameters: [
          {
            name: 'kioskId',
            in: 'path',
            description: 'ID of kiosk to fetch',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'at',
            in: 'query',
            description:
              'The time for which the historical data has to be obtained in UTC format eg:2020-09-21T07:00:00',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'api-token',
            in: 'header',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successfully fetched stations and weather',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    stations: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/station',
                        minItems: 1,
                        maxItems: 1,
                      },
                    },
                    weather: {
                      $ref: '#/components/schemas/weather',
                    },
                    at: {
                      $ref: '#/components/schemas/at',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '403': {
            description: 'Forbidden(api-token not passed)',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/indego-data-fetch-and-store-it-db': {
      post: {
        tags: ['create-snapshot-of-weather-and-stations'],
        summary:
          'Creates a snapshot of the weather and stations info at the time this api is called',
        parameters: [
          {
            name: 'api-token',
            in: 'header',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successfully added stations and weather',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      station: {
        type: 'object',
        properties: {
          geometry: {
            type: 'object',
            properties: {
              coordinates: {
                maxItems: 2,
                minItems: 2,
                type: 'array',
                items: {
                  type: 'number',
                },
              },
            },
          },
          properties: {
            type: 'object',
            properties: {
              coordinates: {
                maxItems: 2,
                minItems: 2,
                type: 'array',
                items: {
                  type: 'number',
                },
              },
              id: {
                type: 'integer',
                format: 'int32',
              },
              name: {
                type: 'string',
              },
              totalDocks: {
                type: 'integer',
                format: 'int32',
              },
              docksAvailable: {
                type: 'integer',
                format: 'int32',
              },
              bikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              classicBikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              smartBikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              electricBikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              rewardBikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              rewardDocksAvailable: {
                type: 'integer',
                format: 'int32',
              },
              kioskStatus: {
                type: 'string',
              },
              kioskPublicStatus: {
                type: 'string',
              },
              kioskConnectionStatus: {
                type: 'string',
              },
              kioskType: {
                type: 'integer',
                format: 'int32',
              },
              addressStreet: {
                type: 'string',
              },
              addressCity: {
                type: 'string',
              },
              addressState: {
                type: 'string',
              },
              addressZipCode: {
                type: 'string',
              },
              bikes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                    },
                    dockNumber: {
                      type: 'integer',
                      format: 'int32',
                    },
                    isElectric: {
                      type: 'boolean',
                    },
                    isAvailable: {
                      type: 'boolean',
                    },
                    battery: {
                      type: 'object',
                    },
                  },
                },
              },
              closeTime: {
                type: 'object',
              },
              eventEnd: {
                type: 'object',
              },
              eventStart: {
                type: 'object',
              },
              isEventBased: {
                type: 'boolean',
              },
              isVirtual: {
                type: 'boolean',
              },
              kioskId: {
                type: 'integer',
                format: 'int32',
              },
              notes: {
                type: 'object',
              },
              openTime: {
                type: 'object',
              },
              publicText: {
                type: 'string',
              },
              timeZone: {
                type: 'object',
              },
              trikesAvailable: {
                type: 'integer',
                format: 'int32',
              },
              latitude: {
                type: 'object',
              },
              longitude: {
                type: 'object',
              },
              _id: {
                type: 'object',
              },
            },
          },
          at: {
            type: 'string',
            format: 'date-time',
          },
          __v: {
            type: 'integer',
          },
        },
      },
      weather: {
        type: 'object',
        properties: {
          coord: {
            type: 'object',
            properties: {
              lon: {
                type: 'number',
              },
              lat: {
                type: 'number',
              },
            },
          },
          main: {
            type: 'object',
            properties: {
              temp: {
                type: 'number',
              },
              feels_like: {
                type: 'number',
              },
              temp_min: {
                type: 'number',
              },
              temp_max: {
                type: 'number',
              },
              pressure: {
                type: 'number',
              },
              humidity: {
                type: 'number',
              },
            },
          },
          wind: {
            type: 'object',
            properties: {
              speed: {
                type: 'number',
              },
              deg: {
                type: 'number',
              },
            },
          },
          clouds: {
            type: 'object',
            properties: {
              all: {
                type: 'number',
              },
            },
          },
          sys: {
            type: 'object',
            properties: {
              type: {
                type: 'number',
              },
              id: {
                type: 'integer',
                format: 'int32',
              },
              country: {
                type: 'string',
              },
              sunrise: {
                type: 'integer',
                format: 'int32',
              },
              sunset: {
                type: 'integer',
                format: 'int32',
              },
            },
          },
          _id: {
            type: 'string',
          },
          weather: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                },
                id: {
                  type: 'integer',
                  format: 'int32',
                },
                main: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                icon: {
                  type: 'string',
                },
              },
            },
          },
          base: {
            type: 'string',
          },
          visibility: {
            type: 'integer',
            format: 'int32',
          },
          dt: {
            type: 'integer',
            format: 'int32',
          },
          timezone: {
            type: 'integer',
            format: 'int32',
          },
          id: {
            type: 'integer',
            format: 'int32',
          },
          name: {
            type: 'string',
          },
          cod: {
            type: 'integer',
            format: 'int32',
          },
          at: {
            type: 'string',
            format: 'date-time',
          },
          __v: {
            type: 'integer',
          },
        },
      },
      at: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};
