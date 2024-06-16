/**
 * place controller
 */

import { factories } from '@strapi/strapi'
import * as strapiUtils from '@strapi/utils'
import { Context } from 'koa';

const { transformParamsToQuery } = strapiUtils.convertQueryParams;
const { sanitize } = strapiUtils;



function customSort(arr1: number[], arr2: number[]): number[] {
    const map = new Map<number, number>();

    // Create a map of values in arr2 with their corresponding index
    arr2.forEach((value, index) => {
        map.set(value, index);
    });

    // Custom sort function based on the order in arr2
    return arr1.sort((a, b) => {
        const indexA = map.get(a);
        const indexB = map.get(b);

        // If both elements are in arr2, sort based on their index
        if (indexA !== undefined && indexB !== undefined) {
            return indexA - indexB;
        }
        // If only one element is in arr2, prioritize it
        else if (indexA !== undefined) {
            return -1;
        } else if (indexB !== undefined) {
            return 1;
        }
        // If neither element is in arr2, maintain their relative order
        else {
            return 0;
        }
    });
}

/*
// node_modules/@strapi/strapi/dist/core-api/controller/collection-type.js/createCollectionTypeController
async find(ctx) {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi.service(uid).find(sanitizedQuery);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults, { pagination });
    },

// node_modules/@strapi/strapi/dist/core-api/service/collection-type.js/createCollectionTypeService
async find(params = {}) {
      const fetchParams = this.getFetchParams(params);
      const paginationInfo = pagination.getPaginationInfo(fetchParams);
      const results = await strapi.entityService?.findMany(uid, {
        ...fetchParams,
        ...pagination.convertPagedToStartLimit(paginationInfo)
      });
      if (pagination.shouldCount(fetchParams)) {
        const count = await strapi.entityService?.count(uid, { ...fetchParams, ...paginationInfo });
        if (typeof count !== "number") {
          throw new Error("Count should be a number");
        }
        return {
          results,
          pagination: pagination.transformPaginationResponse(paginationInfo, count)
        };
      }

//node_modules/@strapi/strapi/dist/services/entity-service/index.js/createDefaultImplementation

async findMany(uid, opts) {
    const { kind } = strapi.getModel(uid);
    const wrappedParams = await this.wrapParams(opts, { uid, action: "findMany" });
    const query = transformParamsToQuery(uid, wrappedParams);
    if (kind === "singleType") {
      const entity = db.query(uid).findOne(query);
      return this.wrapResult(entity, { uid, action: "findOne" });
    }
    const entities = await db.query(uid).findMany(query);
    return this.wrapResult(entities, { uid, action: "findMany" });
  },

1) Нужно разобраться с запросом через "db.query(uid).findOne(query);"
Т.е нужно использовать его плюс добавить сортировку по удаленности для Данзана


interface Query {
  orderBy?: OrderByQuery;
  select?: SelectQuery;
  where?: WhereQuery;
  filters?: FiltersQuery;
  populate?: PopulateQuery;
  count?: boolean;
  ordering?: unknown;
  _q?: string;
  limit?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
}

Нужно делать запрос типа этого:
Допустим есть 100 мест на карте, мы запрашиваем 10 ближайших мест

При текущей реализации, нам вернутся произвольные места в отсортированном виде.

Нам нужно при запросе, сразу фильтровать места по дистанции, и возвращать 10 ближайших мест
вместо того чтобы возвращать рандомные 10 мест и их сортировать по дистанции

Но для этого понадобится реализовать сырой SQL запрос (который соединит параметры из ctx.query с кастомным запросом на ll_earth_distance)
в котором нужно учесть все возможные 
поля, - done
фильтрации, - in progress
сортировки, - done
пагинации, - done
джойны - in progress

которые за нас уже Strapi реализовал.
*/

type SelectQuery = string | string[];
type SortOrder = 'asc' | 'desc';
interface SortMap {
    [key: string]: SortOrder | SortMap;
}
type OrderByQuery = SortMap | SortMap[];

interface WhereQuery {
  [key: string]: any;
}

type TPagination = {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

type TQueryParams = {
  fields?: string[];
  pagination?: TPagination;
  user_longitude?: string;
  user_latitude?: string;
}

function parseSelectStatements(fields: SelectQuery) {
  let selectStatement = `SELECT `;

  if(Array.isArray(fields)) {
    const fieldsString = fields.join(", ");
    selectStatement += fieldsString;
  } else {
    selectStatement += fields;
  }

  return selectStatement;
}

function parseWhereStatements(filters?: WhereQuery) {
  if(!filters) {
    return "";
  }
  let whereStatement = `WHERE `;

  for(let [key, value] of Object.entries(filters)) {
    whereStatement += `${key} = ${value} AND `;
  }

  // remove last `AND ` statement
  return whereStatement.slice(0, -4);
}

function parsePaginationStatements(data: TPagination) {
  const { page, pageSize, start, limit } = data;

  let offsetStatement = `OFFSET `;
  let limitStatement = `LIMIT `;

  if(page && pageSize) {
    const offset = (page - 1) * pageSize;
    
    offsetStatement += `${offset}`;
    limitStatement += `${pageSize}`;

    console.log("offsetStatement", offsetStatement)
    console.log("limitStatement", limitStatement);
    
  }

  else if(start && limit) {
    const offset = (start - 1) * limit;
    
    offsetStatement += `${offset}`;
    limitStatement += `${limit}`;
  }

  return `${offsetStatement} ${limitStatement}`;
}

function convertQueryParamsToRawSQL(queryParams: TQueryParams) {
  const uid = 'api::place.place';
  console.log("ctx.query", queryParams)
  // const query = transformParamsToQuery(uid, queryParams);

  let selectStatement = parseSelectStatements(queryParams?.fields);
  const fromStatement = `FROM places`;
  // let whereStatement = parseWhereStatements(queryParams);
  const orderByStatement = `ORDER BY distance`;
  const paginationStatement = parsePaginationStatements({
    page: queryParams?.pagination?.page,
    pageSize: queryParams?.pagination?.pageSize,
    start: queryParams?.pagination?.start,
    limit: queryParams?.pagination?.limit,
  });


  ///////////

  const latitude = queryParams?.user_latitude as unknown as number;
  const longitude = queryParams?.user_longitude as unknown as number;

  const selectDistanceStatement = `, earth_distance(
    ll_to_earth(${latitude}, ${longitude}),
    ll_to_earth(latitude, longitude)
  ) AS distance`;

  selectStatement += selectDistanceStatement;

  return `
    ${selectStatement}
    ${fromStatement}
    ${orderByStatement}
    ${paginationStatement}
    ;
  `;
}
 
export default factories.createCoreController('api::place.place', ({ strapi }) => ({
    async find(ctx) {
      const uid = 'api::place.place';
        // your custom logic for modifying the input
      ctx.query = { 
        ...ctx.query, 
      }; // force ctx.query.locale to 'en' regardless of what was requested

    //   console.log("ctx.query", ctx.query)
  

      // Call the default parent controller action
      const result = await super.find(ctx);

      if(ctx.query.user_longitude && ctx.query.user_latitude) {
        const customQuery = convertQueryParamsToRawSQL(ctx.query);
        // console.log("customQuery", customQuery)

        // @ts-ignore
        const rawSqlResults = await strapi.db.connection.context.raw(customQuery);
        // console.log("rawSqlResults", rawSqlResults.rows)

        return {
          data: rawSqlResults.rows,
          meta: result.meta,
        };
      }

      return result;
    }
}))
