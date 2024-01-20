# frontend/Dockerfile
FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./client .
# COPY next.config.js ./
# COPY src /app/src
# COPY public /app/public
RUN npm run build

CMD ["npm", "start"]
