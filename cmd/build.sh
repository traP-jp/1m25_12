#! /bin/bash

npm install -g pnpm

set -a
# shellcheck source=/dev/null
source .env
# shellcheck source=/dev/null
source .env.production
set +a

pnpm install prisma
npx prisma generate
npx prisma migrate deploy

pnpm install --frozen-lockfile --prod
pnpm build
