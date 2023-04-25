FROM node:19

RUN mkdir /src

ADD . /src

WORKDIR /src/public/frontend/cs555-agile-titans

RUN npm install

RUN npm run build

WORKDIR /src/public/frontend/cs555-agile-titans/build

RUN cp -R * ../../../

WORKDIR /src

RUN mkdir public/uploads

RUN npm install

CMD npm start
