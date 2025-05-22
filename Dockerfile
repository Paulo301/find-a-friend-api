FROM node:20.19.2-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force

FROM node:20.19.2-alpine3.21

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3333

CMD ["sh", "-c", "npm run db:deploy && npm run start"]