import validation, { TOverview, TProfile } from "./validation";
import utils from "@strapi/utils";
import axios from "axios";

const { validateGetRoutesParams } = validation;
const { ApplicationError } = utils.errors;

type TOSRMSimplifiedRoute = {
  geometry: string;
  distance: number;
  duration: number;
};

type TValhallaResponse = {
  code: string;
  routes: TOSRMSimplifiedRoute[];
};

type TPlace = {
  id: number;
  latitude: number;
  longitude: number;
};

type TValhallaLocation = {
  lat: number;
  lon: number;
};

interface IFilters {
  steps: boolean;
  overview: TOverview;
  alternatives: boolean;
  profile: TProfile;
  places: TPlace[];
  exclude?: TValhallaLocation[];
}

function buildRequestUrl(filters: IFilters): string {
  const { profile, places, exclude } = filters;
  let costing = "auto";
  let pedestrian_type = "foot";

  if (profile === "foot" || profile === "wheelchair") {
    costing = "pedestrian";
  }

  if (profile === "wheelchair") pedestrian_type = "wheelchair";

  const locations = places.map((place) => ({
    lat: place.latitude,
    lon: place.longitude,
  }));

  const json = JSON.stringify({
    costing,
    directions_type: "none",
    costing_options: {
      auto: {},
      pedestrian: {
        pedestrian_type,
      },
    },
    exclude_polygons: [],
    locations,
    directions_options: { units: "kilometers" },
    format: "osrm",
    exclude_locations: exclude,
  });

  return `http://31.129.102.40:8002/route?json=${json}`;
}

export default {
  getRoutes: async (ctx, next) => {
    try {
      const { places_ids, alternatives, overview, steps, profile, exclude } =
        await validateGetRoutesParams(ctx.request.query);

      const places = (await strapi.entityService.findMany("api::place.place", {
        fields: ["id", "latitude", "longitude"],
        filters: {
          id: {
            $in: places_ids,
          },
        },
      })) as unknown as TPlace[];

      // Order the places to match the order of the ids array
      const orderedPlaces = places_ids.map((id) =>
        places.find((place) => place.id === id)
      );

      if (!orderedPlaces || !orderedPlaces.length) {
        throw new ApplicationError("Места не найдены");
      }

      let filterForBuildUrl: IFilters = {
        steps,
        overview,
        alternatives,
        profile,
        places: orderedPlaces,
      };

      if (exclude) filterForBuildUrl.exclude = exclude;

      const requestUrl = buildRequestUrl(filterForBuildUrl);

      console.log("RequestUrl", requestUrl);

      const response = await axios.get<TValhallaResponse>(requestUrl);

      const { code, routes } = response.data;

      if (code !== "Ok") {
        throw new ApplicationError("Запрос был не успешен");
      }

      const route = routes[0];

      return {
        geometry: route.geometry,
        distance: route.distance,
        duration: route.duration,
      };
    } catch (error: unknown) {
      const err = error as Error;
      if (err.name === "ValidationError") {
        // @ts-ignore
        return ctx.badRequest(err.message, err.errors);
      } else {
        console.error(err);
        throw new ApplicationError(err.message);
      }
    }
  },
};
