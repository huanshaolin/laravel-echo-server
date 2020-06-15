FROM node:10.16.3

WORKDIR /usr/src/app

ADD ./deloy ./

ADD ./package.json ./

RUN npm install

EXPOSE 6001

CMD [ "node", "server.js" ]