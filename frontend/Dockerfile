# Stage 1: Build the Angular app
FROM node:18 AS build

# Set working directory to /frontend
WORKDIR /frontend

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . . 

EXPOSE 4200

# Run http-server to serve the Angular app

CMD ["ng", "serve", "--host", "0.0.0.0"]