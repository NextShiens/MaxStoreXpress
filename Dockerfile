# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV REACT_APP_KEYCLOAK_URL=http://localhost:8080/
ENV REACT_APP_KEYCLOAK_REALM=maxstore
ENV REACT_APP_KEYCLOAK_CLIENT_ID=maxstore-client

# Run the application
CMD ["npm", "react-scripts --openssl-legacy-provider start"]
