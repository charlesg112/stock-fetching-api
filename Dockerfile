FROM node:alpine

WORKDIR .

COPY . .

RUN npm install

CMD ["npm", "run", "start"]