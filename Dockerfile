FROM node:20.19.0 AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20.19.0 AS production

WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy Next.js build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copy config files if needed
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["pnpm", "start"]
