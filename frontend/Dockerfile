FROM node:14 AS builder

WORKDIR /code

COPY package.json package-lock.json .next ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run dev"]