FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared-ui/package*.json ./packages/shared-ui/
COPY packages/shared-utils/package*.json ./packages/shared-utils/
COPY packages/shared-constants/package*.json ./packages/shared-constants/
COPY packages/shared-validation/package*.json ./packages/shared-validation/

RUN npm install

COPY . .

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["npm", "run", "dev"]
