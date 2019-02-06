FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
COPY build build

RUN npm install --only=production

CMD ["npm", "run", "serve"]
