FROM node:alpine

WORKDIR /usr/src/app 

COPY package* ./

RUN npm ci 

# this is a bit weird (docker ignore or limit copy to src)
COPY . .

EXPOSE 7999

CMD [ "npm","run", "start" ]

