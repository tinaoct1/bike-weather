export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'your description here',
        termsOfService: '',
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            "url": "https://{env}.gigantic-server.com:{port}/{basePath}",
            "description": "The production API server",
            "variables": {
                "env": {
                    "default": "dev",
                    "description": "DEV Environment"
                },
                "port": {
                    "enum": [
                        "8443",
                        "3000",
                        "443"
                    ],
                    "default": "8443"
                },
                "basePath": {
                    "default": "v1"
                }
            }
        }
    ],
}