# Use the official Node.js image as the base image
FROM node:21-alpine

# Create a new directory for the app
WORKDIR /server

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Create a non-root user
RUN adduser -D serveruser

# Change ownership of the working directory to the new user
RUN chown -R serveruser /server

# Switch to the new user
USER serveruser

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
