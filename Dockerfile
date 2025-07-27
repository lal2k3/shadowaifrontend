FROM node:current-alpine3.20 AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine3.19
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
