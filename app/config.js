
const config = {
    
    app: {
        name: 'PizzaSanMarco',
        version: '1.0.0',
        development: [
            {
                name: 'TouchMedia360',
                email: 'tehnic@touch-media.ro',
                team: [
                    {name: 'Andrei Telteu', email: 'andrei.telteu@touch-media.ro'},
                    {name: 'Alin Adamita', email: 'alin@touch-media.ro'},
                ],
            },
        ],
    },
    storage_url:  'https://www.pizzasanmarco.ro/storage/', // https://sanmarco.laravel.touchmediahost.com/storage/ || https://www.pizzasanmarco.ro/storage/
    services: {
        
        api: {
            environment: 'production', // production / staging
            endpoint: null,
            endpoint_production: 'https://www.pizzasanmarco.ro/api',  // https://sanmarco.laravel.touchmediahost.com/api || https://www.pizzasanmarco.ro/api
            endpoint_staging: '',
            cdn_url:  'https://www.pizzasanmarco.ro',  // https://sanmarco.laravel.touchmediahost.com || https://www.pizzasanmarco.ro
            
        },
    },
};

config.services.api.endpoint = config.services.api['endpoint_'+config.services.api.environment];

export default config;
