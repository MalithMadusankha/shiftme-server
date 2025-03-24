FROM node:22

WORKDIR /app

COPY . .

# install dependencies
RUN npm install

# run the app
CMD ["npm", "start"]