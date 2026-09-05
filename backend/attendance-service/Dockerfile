# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3003
CMD ["node", "dist/main.js"]