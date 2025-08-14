FROM node:24.5-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY ./package.json ./pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --prod
RUN pnpm install prisma

COPY ./prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN pnpm run build

EXPOSE 3000

ENTRYPOINT [ "pnpm", "start" ]
