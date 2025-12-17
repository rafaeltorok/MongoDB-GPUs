# Backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy only source code (not .env, node_modules, etc.)
COPY package*.json ./
COPY src ./src
COPY dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Expose the port your app runs on
EXPOSE 4000

# Start the server
CMD ["npm", "start"]