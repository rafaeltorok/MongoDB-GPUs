FROM node:20

WORKDIR /usr/src/todo-backend

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./package*.json .

RUN npm ci

ENV DEBUG=todo-backend:*

USER node

CMD ["npm", "run", "dev"]
