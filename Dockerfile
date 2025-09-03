# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# If you use npm workspaces, adjust accordingly
RUN npm ci
COPY . .
# Ensure your build outputs to ./dist
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# Create SSL directory in container
RUN mkdir -p /app/ssl/rds
# change ./dist/server.js to your actual entry file
EXPOSE 3000
CMD ["node", "dist/app.js"]