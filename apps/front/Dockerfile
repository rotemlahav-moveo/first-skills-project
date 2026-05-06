FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Builds to dist/front based on apps/front/vite.config.mts
RUN npx nx build front

FROM nginx:1.27-alpine AS runtime

# Serve static frontend assets.
COPY --from=builder /app/dist/front /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
