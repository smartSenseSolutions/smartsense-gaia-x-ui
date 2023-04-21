# base image
FROM node:16.14.2-alpine AS build

# set working directory
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend

ENV PATH=${PATH}:./node_modules/.bin
ENV NODE_PATH=/usr/src/app/frontend/node_modules

# copy package.json seperately for caching package installation
ADD package.json ./
ADD package-lock.json ./
RUN npm ci

RUN ngcc

# copy source code
ADD . .

# build
RUN ng build --configuration=production
RUN node brotli_compress.js


FROM fholzer/nginx-brotli:v1.21.6

WORKDIR /etc/nginx

COPY --from=build /usr/src/app/frontend/dist/smartsense-gaia-x-ui /usr/share/nginx/html

ADD nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
