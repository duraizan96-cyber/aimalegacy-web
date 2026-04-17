# ─────────────────────────────────────────────
# Aima Legacy — Hardened production Dockerfile
# Multi-stage build: node (build) → nginx (serve)
# ─────────────────────────────────────────────

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npx vite build

# Stage 2: Serve (nginx)
# Note: running as root inside container (Docker isolation is the boundary).
# Hardening lives in nginx.conf (CSP, HSTS, rate limiting, X-Frame-Options).
# Non-root USER + setcap was attempted but breaks port-80 binding under
# Easypanel's Docker runtime — reverted 2026-04-17.
FROM nginx:alpine

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy built assets and hardened config
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove unnecessary files
RUN rm -rf /usr/share/nginx/html/50x.html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
