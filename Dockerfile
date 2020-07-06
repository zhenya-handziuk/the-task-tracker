FROM node:14.1

ARG PORT=3100

ENV PORT=${PORT}
ENV TZ="Europe/Kiev"

RUN mkdir -p /app
WORKDIR /app

COPY src src
COPY package.json \
    package-lock.json \
    .sequelizerc \
    ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD npm start
