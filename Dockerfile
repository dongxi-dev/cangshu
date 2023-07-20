FROM node:lts-alpine3.18

RUN npm i -g pnpm

COPY . /app

WORKDIR /app

RUN pnpm i