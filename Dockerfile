# Built and run on vps1 by homelab (next/fleet). Two stages: Node builds the site, Node serves it.
# Prisma's engine needs openssl on a slim image, so it is installed in both stages.
FROM node:24-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /site
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /site
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build /site/node_modules ./node_modules
COPY --from=build /site/dist ./dist
COPY --from=build /site/package.json ./package.json
EXPOSE 4321
USER node
CMD ["node", "./dist/server/entry.mjs"]
