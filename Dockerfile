FROM node:alpine

WORKDIR /usr/src/app 

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 7999

CMD [ "npm","run", "serve:api" ]

