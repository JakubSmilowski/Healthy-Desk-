# Use an official Node.js runtime as a parent image
FROM node:20

# Set working directory to the project root
WORKDIR /Healthy-Desk-

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install
# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set working directory to the frontend directory
WORKDIR /Healthy-Desk-/frontend

# Copy the frontend source code to the container
COPY frontend .

# Link the root node_modules to the frontend directory
RUN ln -s /Healthy-Desk-/node_modules ./node_modules

# Expose the application port
EXPOSE 4200

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]