# /client/Dockerfile and /alternate-client/Dockerfile
# Multi-stage build approach for efficient image creation

# Stage 1: Build the application
FROM node:20 AS build

# Accept build arguments from docker-compose
# These become available as environment variables during the build process
ARG VITE_BACKEND_URL
# Convert the build argument to an environment variable that Vite can access
# This is crucial - Vite only processes environment variables that start with VITE_
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (this leverages Docker's layer caching)
# If package.json hasn't changed, Docker can reuse the npm install layer
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
# During this step, Vite will replace import.meta.env.VITE_BACKEND_URL 
# with the actual value we provided through the environment variable
RUN npm run build

# Stage 2: Prepare static assets
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html