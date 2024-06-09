# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY . .
RUN yarn build

# Run stage
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]