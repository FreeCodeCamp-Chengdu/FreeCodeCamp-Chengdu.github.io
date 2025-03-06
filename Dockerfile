FROM node:22-slim AS base
RUN apt-get update && \
    apt-get install ca-certificates curl libjemalloc-dev -y --no-install-recommends  && \
    rm -rf /var/lib/apt/lists/*
# set environment variable to preload JEMalloc
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so.2"
# set GC time, set arenas number, set background_thread run GC
ENV MALLOC_CONF=dirty_decay_ms:1000,narenas:2,background_thread:true
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store  pnpm i --frozen-lockfile
RUN CI=true  pnpm build

FROM base
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/standalone ./
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]