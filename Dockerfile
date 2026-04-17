FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf

# Minimal bootstrap page to verify container works
RUN mkdir -p /usr/share/nginx/html && \
    echo '<!doctype html><html><head><meta charset="utf-8"><title>Aima Legacy</title></head><body style="background:#04040f;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0"><div><h1>Aima Legacy</h1><p>Servicio restablecido. Desplegando versión completa...</p></div></body></html>' > /usr/share/nginx/html/index.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
