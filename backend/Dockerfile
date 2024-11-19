FROM node:18

# Navigate to directory
WORKDIR /Healthy-Desk-

# Install dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN npm install dotenv
RUN npm install -g typescript
RUN npm install @types/dotenv --save-dev
COPY package*.json ./
RUN npm install

# Copy code
COPY backend ./backend

# Compile
RUN npm run build:backend

# Application port
EXPOSE 8000

# Start the server and the Python API service
CMD ["sh", "-c", "npm run start:backend & python3 backend/src/config/desk-api.py"]