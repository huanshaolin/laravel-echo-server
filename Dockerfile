FROM node:10.16.3

WORKDIR /usr/src/app

ADD ./dist ./

ADD ./package.json ./

RUN npm install

EXPOSE 6001

CMD [ "node", "server.js" ]