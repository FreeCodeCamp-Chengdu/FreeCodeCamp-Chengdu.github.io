FROM node:26-slim AS base
RUN apt-get update && \
    apt-get install ca-certificates curl libjemalloc-dev -y --no-install-recommends  && \
    rm -rf /var/lib/apt/lists/*
# set environment variable to preload JEMalloc
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so.2"
# set GC time, set arenas number, set background_thread run GC
ENV MALLOC_CONF=dirty_decay_ms:1000,narenas:2,background_thread:true
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i pnpm@latest -g
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY patches ./patches
RUN pnpm fetch --frozen-lockfile --store-dir=/pnpm/store
COPY . .
RUN pnpm i --offline --frozen-lockfile --store-dir=/pnpm/store
RUN CI=true  pnpm build

FROM base
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.env* ./
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]