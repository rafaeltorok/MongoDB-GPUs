# nginx/Dockerfile
FROM node:20 as build-main
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /app
COPY ../client/package*.json ./
RUN npm install
COPY ./client .
RUN npm run build

FROM node:20 as build-alt
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /app
COPY ./alternate-client/package*.json ./
RUN npm install
COPY ./alternate-client .
RUN npm run build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-main /app/dist /usr/share/nginx/html/
COPY --from=build-alt /app/dist /usr/share/nginx/html/alt
