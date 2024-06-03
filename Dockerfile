FROM node:20-alpine AS base

RUN apk add -U --no-cache tzdata
RUN echo "America/Chihuahua" > /etc/timezone
RUN ln -fs /usr/share/zoneinfo/America/Chihuahua /etc/localtime

FROM base AS dependencies
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM base AS production-stage
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=dependencies /app .
EXPOSE 4000
CMD ["node","dist/src/bootstrap.js"]
