FROM node:22.16-alpine3.22 AS builder

WORKDIR /opt/survey-tool

COPY . .

RUN npm run build


ENTRYPOINT [ "npm", "run", "start" ]

