# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port on which the app will run
EXPOSE 80

# Start the application
CMD ["node", "dist/app.js"]