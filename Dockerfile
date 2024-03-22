FROM node:20.11-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run clean:dist

RUN npm run ts:build

CMD [ "npm", "run", "start"]