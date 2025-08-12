FROM node:22 as build-stage

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

RUN npm run build

FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html