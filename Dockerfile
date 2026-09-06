FROM node:12.14.1 AS builder

WORKDIR /app

RUN npm install -g npm@6.14.18

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/emulator /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
