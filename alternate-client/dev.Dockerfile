FROM node:20

WORKDIR /usr/src/alternate_client

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]