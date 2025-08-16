## 準備

```
npm install -g pnpm
pnpm install
npx prisma generate
```

### 環境変数

`.env.local`

```
NS_MARIADB_HOSTNAME=db
NS_MARIADB_PORT=3306
NS_MARIADB_DATABASE=1m25_12
NS_MARIADB_USER=user
NS_MARIADB_PASSWORD=password

DATABASE_URL=mysql://user:password@localhost:3306/1m25_12

TRAQ_BOT_TOKEN={traQ BOT access token}
USER_NAME={your traQ id}
```

## データベース

### 立ち上げ

```
pnpm db:up
```

### 停止

```
pnpm db:down
```

### マイグレーション

```
pnpm db:migrate
```

## クライアント

### 立ち上げ

```
pnpm dev
```

## githooks

```bash
git config core.hooksPath .githooks
chmod -R +x .githooks/
```
