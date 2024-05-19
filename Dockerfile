FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
# COPY public public

ENV NODE_ENV production
CMD ["bun", "src/index.js"]

EXPOSE 4000