FROM node:18.19.0-alpine3.18 as base

# FROM base as dev
# RUN yarn install --immutable
# USER node
# COPY . .
# CMD yarn run dev

# FROM base as test
# ENV NODE_ENV test
# RUN yarn install --immutable
# USER node
# COPY . .
# RUN yarn run test

FROM base as prod-build
WORKDIR /app/frontend

RUN yarn set version 1.22.19

COPY package.json .
COPY yarn.lock .

RUN yarn install --immutable

ENV NODE_ENV production

COPY . .

RUN yarn build

# production environment
FROM nginx:stable-alpine
ARG ENV

COPY --from=prod-build /app/frontend/dist /var/www/html
COPY --from=prod-build /app/frontend/cicd/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=prod-build /app/frontend/cicd/nginx/sites-available/${ENV}.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
