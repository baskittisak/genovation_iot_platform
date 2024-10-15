FROM node:18.19.1

WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8080
CMD ["node", "dist/server.js"]