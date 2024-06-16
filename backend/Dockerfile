FROM node:18.19.0-alpine3.18

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]