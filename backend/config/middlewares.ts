export default ({ env }) => ([
    'strapi::logger',
    'strapi::errors',
    // 'strapi::security',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              `https://${env("AWS_BUCKET")}.${env("AWS_ENDPOINT")}`,
              // `localhost:9000`, // for standalone
              // `minio:9000`, // for docker compose
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              `https://${env("AWS_BUCKET")}.${env("AWS_ENDPOINT")}`,
              // `localhost:9000`, // for standalone
              // `minio:9000`, // for docker compose
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]);