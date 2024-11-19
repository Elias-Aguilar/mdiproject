FROM node:22.11.0

WORKDIR /usr/src/app

COPY package-lock.json .

COPY package.json .

COPY config ./config

COPY db ./db

COPY node_modules ./node_modules

COPY public ./public

COPY routes ./routes

COPY views ./views

COPY app.js .

COPY index.js .

EXPOSE 8080

CMD ["npm", "ci"]
