FROM node:20

WORKDIR /usr/src/server

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./package*.json .

RUN npm install

ENV DEBUG=server:*

USER node

CMD ["npm", "run", "dev"]
