FROM node:21-alpine 

WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY ./ . 
COPY ./package.json .

RUN yarn install
CMD ["yarn", "run", "dev"]