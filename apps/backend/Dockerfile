FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build backend bundle and generate pruned runtime manifests.
RUN npx nx build backend && npx nx run backend:prune

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy backend build artifacts.
COPY --from=builder /app/dist/apps/backend ./

# Install runtime dependencies from pruned lockfile.
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "main.js"]
