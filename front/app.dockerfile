FROM node:latest
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD package.json /usr/src/app/package.json
RUN npm install

CMD [ "npm", "start" ]