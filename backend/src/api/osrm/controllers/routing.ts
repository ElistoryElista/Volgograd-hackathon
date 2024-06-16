import validation, { TOverview, TProfile } from "./validation";
import utils from "@strapi/utils";
import axios from 'axios';

const { validateGetRoutesParams } = validation;
const { ApplicationError, ValidationError } = utils.errors;

/////////////////////////////////////////////////////

// Foot
// http://5.35.84.9:4000/route/v1/driving/46.3104,44.2707;46.3096,44.2839?steps=false

// Car
// http://5.35.84.9:5000/route/v1/driving/46.3104,44.2707;46.3096,44.2839?steps=false 

// Params
/*
  {
    places_ids: '1,2,3,4', // number[]
    steps: 'true', // [true, false] - default: false
    overview: 'full', // [false, full, simplified] - default: simplified
    alternatives: 'true', // [true, false] - default: false
    response: 'simplified', // [full, simplified] - default: simplified
    profile: 'foot' // [foot, car]
  }
*/

// Response

/// Simplified
/*
  geometry: "{lu_IypwpAVrAvAdI", // string
  distance: 90.0, // float in metres
  duration: 300.0, // float in seconds
*/

/// Full
/*
  Full response from OSRM
*/

/// OSRM response
/*
  {
    "code": "Ok",
    "routes": [
        {
            "geometry": "esrpGeuy{G??",
            "legs": [
                {
                    "steps": [],
                    "distance": 0,
                    "duration": 0,
                    "summary": "",
                    "weight": 0
                }
            ],
            "distance": 0,
            "duration": 0,
            "weight_name": "duration",
            "weight": 0
        }
    ],
    "waypoints": [
        {
            "hint": "8xQHgPQUB4BhBAAAAAAAANwJAACDgwEAEAUcQwAAAADtlK9DWkZXRmEEAAAAAAAA3AkAAIODAQDRRQCA3RXIApkIrAIApMICbISjAgIAbxGDcref",
            "distance": 68199.2481,
            "name": "",
            "location": [
                46.667229,
                44.828825
            ]
        },
        {
            "hint": "8xQHgPQUB4BhBAAAAAAAANwJAACDgwEAEAUcQwAAAADtlK9DWkZXRmEEAAAAAAAA3AkAAIODAQDRRQCA3RXIApkIrALgoMIC_LejAgIAbxGDcref",
            "distance": 66885.290928,
            "name": "",
            "location": [
                46.667229,
                44.828825
            ]
        }
    ]
}
*/

/////////////////////////////////////////////////////

type TOSRMSimplifiedRoute = {
  geometry: string;
  distance: number;
  duration: number;
}

type TOSRMSimplifiedResponse = {
  code: string;
  routes: TOSRMSimplifiedRoute[];
}

type TPlace = { 
  id: number, 
  latitude: number, 
  longitude: number 
};

interface IOsrmFilters {
  steps: boolean,
  overview: TOverview,
  alternatives: boolean,
  profile: TProfile,
  places: TPlace[],
  user_longitude?: number, 
  user_latitude?: number, 
}

function buildOsrmRequestUrl(filters: IOsrmFilters): string {
  const { profile, steps, overview, alternatives, user_longitude, user_latitude } = filters;
  let port = 5000;
  let coordinates = "";

  if(profile === 'foot') {
    port = 4000;
  }

  for(const { id, longitude, latitude } of filters.places) {
    console.log(`Place id: ${id}; ${longitude},${latitude};`)
    coordinates += `${longitude},${latitude};`;
  }

  coordinates = coordinates.slice(0, -1); // remove unnessary last ";"

  let osrmUrl = "";

  if(user_longitude && user_latitude) {
    osrmUrl = `http://5.35.84.9:${port}/route/v1/driving/${user_longitude},${user_latitude};${coordinates}?steps=${steps}&overview=${overview}&alternatives=${alternatives}`;
  } else {
    osrmUrl = `http://5.35.84.9:${port}/route/v1/driving/${coordinates}?steps=${steps}&overview=${overview}&alternatives=${alternatives}`;
  }

  return osrmUrl;
}

export default {
  getRoutes: async (ctx, next) => {
    try {
        const { 
          places_ids, 
          alternatives, 
          overview, 
          response, 
          steps, 
          profile, 
          user_longitude, 
          user_latitude 
        } = await validateGetRoutesParams(ctx.request.query);

        let isMobile = false;

        if(user_longitude && user_latitude) {
          isMobile = true;
        }
      
        const places = await strapi.entityService.findMany("api::place.place", {
          fields: ["id", "latitude", "longitude"],
          filters: {
            id: {
              $in: places_ids,
            },
          }
        }) as unknown as TPlace[]

        // Order the places to match the order of the ids array
        const orderedPlaces = places_ids.map(id => places.find(place => place.id === id));

        if(!orderedPlaces || !orderedPlaces.length) {
          throw new ApplicationError('Места не найдены');
        }

        if(response === 'simplified') {
          if(overview === "false") {
            throw new ApplicationError('При response=simplified, overview не должно быть false');
          }

          let osrmRequestUrl = "";

          if(isMobile) {
            osrmRequestUrl = buildOsrmRequestUrl({
              steps,
              overview,
              alternatives,
              profile,
              places: orderedPlaces,
              user_longitude,
              user_latitude,
            });
          } else {
            osrmRequestUrl = buildOsrmRequestUrl({
              steps,
              overview,
              alternatives,
              profile,
              places: orderedPlaces,
            });
          }

          console.log("osrmRequestUrl", osrmRequestUrl)

          const osrmSimplifiedResponse = await axios.get<TOSRMSimplifiedResponse>(osrmRequestUrl);

          const { code, routes } = osrmSimplifiedResponse.data;

          if(code !== 'Ok') {
            throw new ApplicationError('Запрос в OSRM был не успешен');
          }

          const route = routes[0];

          return {
            geometry: route.geometry,
            distance: route.distance,
            duration: route.duration,
          };
        } else {
          let osrmRequestUrl = "";

          if(isMobile) {
            osrmRequestUrl = buildOsrmRequestUrl({
              steps,
              overview,
              alternatives,
              profile,
              places: orderedPlaces,
              user_longitude,
              user_latitude,
            });
          } else {
            osrmRequestUrl = buildOsrmRequestUrl({
              steps,
              overview,
              alternatives,
              profile,
              places: orderedPlaces,
            });
          }

          const osrmFullResponse = await axios.get(osrmRequestUrl);

          const { code, ...data } = osrmFullResponse.data;

          if(code !== 'Ok') {
            throw new ApplicationError('Запрос в OSRM был не успешен');
          }

          return {
            code,
            ...data,
          }
        }
    } catch (error: unknown) {
        const err = error as Error;
        if(err.name === 'ValidationError') {
          // @ts-ignore
          return ctx.badRequest(err.message, err.errors);
        }
        else {
          console.error(err);
          throw new ApplicationError(err.message);
        }
    }
  }
};
