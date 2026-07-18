# Stage 1: Build React static assets
FROM node:18-alpine AS build

WORKDIR /app

# Copy package configurations
COPY package*.json ./

# Install packages using clean install
RUN npm ci

# Copy source and build project
COPY . .
RUN npm run build

# Stage 2: Serve React assets using Nginx in production
FROM nginx:alpine

# Copy built resources to nginx default html root folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
