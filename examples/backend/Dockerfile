FROM node:12-alpine

WORKDIR /srv

ADD ./ /srv

RUN apk add --no-cache tini \
  && rm -rf /var/cache/apk/* \
  && mv _package.json package.json \
  && npm i

CMD ["tini", "--", "npm", "start"]
