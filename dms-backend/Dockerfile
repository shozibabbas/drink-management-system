FROM node:16.18.1-alpine

RUN mkdir dms-backend
WORKDIR /dms-backend
COPY ./dist ./dist
COPY ./.env.production ./.env.production
COPY ./node_modules ./node_modules
COPY ./client ./client
ENV NODE_ENV=production