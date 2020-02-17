FROM node:12-alpine

WORKDIR /srv

ADD . /srv

RUN apk add --no-cache tini && npm ci

CMD ["tini", "--", "./node_modules/.bin/ts-node", "src/main.ts"]
