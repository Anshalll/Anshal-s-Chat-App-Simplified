FROM node:21-alpine

WORKDIR /server

COPY . .

USER node:node

ENV  PORT 4000

RUN npm install 

CMD npm start