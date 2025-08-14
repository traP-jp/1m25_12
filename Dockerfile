FROM node:24.5-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 3000

CMD pnpm run start
