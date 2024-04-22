FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app

# install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# copy the project code
COPY . /app/

# define the default command to run when starting the container
RUN npm ci

EXPOSE 3000

ENV HOST=0.0.0.0

RUN npm run-script build
CMD [ "node", "build/index.js"]
