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

# Stage 2: Serve (hardened nginx, non-root)
FROM nginx:alpine

# Install setcap so nginx can bind to port 80 as non-root
RUN apk add --no-cache libcap && \
    rm -f /etc/nginx/conf.d/default.conf

# Copy built assets and config
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user, set ownership, grant net_bind capability
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid && \
    chown -R appuser:appgroup /etc/nginx && \
    # Allow the nginx binary to bind privileged port 80 without root
    setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx && \
    # Remove unnecessary files + setcap package (no longer needed)
    rm -rf /usr/share/nginx/html/50x.html && \
    apk del libcap

# Switch to non-root user — last line of defense if container is ever compromised
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
