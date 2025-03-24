FROM node:22.14.0

WORKDIR /app

# Copy the package.json and package-lock.json first to install dependencies
COPY package*.json ./

# install dependencies
RUN npm install

# Ensure the .env file is included in the Docker image
COPY .env .env

# Copy the rest of the application code
COPY . .

EXPOSE 5000:5000

# run the app
CMD ["npm", "start"]
