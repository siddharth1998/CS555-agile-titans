FROM alpine

RUN apk add --update --no-cache nodejs npm

RUN mkdir /src

ADD . /src

WORKDIR /src/public/frontend/cs555-agile-titans

RUN npm install

RUN npm run build

WORKDIR /src/public/frontend/cs555-agile-titans/build

RUN cp -R * ../../../

RUN rm -rf /src/public/frontend/

WORKDIR /src

RUN mkdir public/uploads

RUN npm install

RUN npm cache clean --force

CMD ["npm", "start"]
