export default ({ env }) => ({
    upload: { // for remote server
        config: {
            provider: 'aws-s3',
            providerOptions: {
                credentials: {
                    accessKeyId: env("AWS_ACCESS_KEY_ID"),
                    secretAccessKey: env("AWS_ACCESS_SECRET"),
                },
                region: `${env("AWS_REGION")}`,
                endpoint: `https://${env("AWS_ENDPOINT")}`, // e.g. "s3.fr-par.scw.cloud"
                params: {
                    Bucket: env("AWS_BUCKET"),
                },
            },
        },
    },

    // upload: {  // for localhost
    //     config: {
    //       provider: 'aws-s3',
    //       providerOptions: {
    //         baseUrl: env('AWS_PUBLIC_ENDPOINT'),
    //         s3Options: {
    //           credentials: {
    //             accessKeyId: env('AWS_ACCESS_KEY_ID'),
    //             secretAccessKey: env('AWS_ACCESS_SECRET'),
    //           },
    //           endpoint: env('AWS_PRIVATE_ENDPOINT'),
    //           region: env('AWS_REGION'),
    //           forcePathStyle: true,
    //           params: {
    //             Bucket: env('AWS_BUCKET'),
    //           },
    //         }
    //       },
    //     },
    //   },









    'transformer': {
        enabled: true,
        config: {
            prefix: "/api/",
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
});
