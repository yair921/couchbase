# The image is built on top of one that has node preinstalled
FROM node:latest

# Create app directory
# WORKDIR /app
# Create app directory
WORKDIR /usr/src/app

# Copy all files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Open appropriate port 
EXPOSE 3000

# Start the application
CMD ["node", "app"]
