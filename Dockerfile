FROM node:20.19.2-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json .env ./

RUN npm install

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force

FROM node:20.19.2-alpine3.21 AS migrations

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

RUN npx prisma migrate up

FROM node:20.19.2-alpine3.21

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.env ./.env
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]