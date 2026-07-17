FROM caddy:2-alpine
WORKDIR /srv
COPY . /srv
# Railway передаёт порт в $PORT; caddy отдаёт статику и index.html
CMD ["sh","-c","caddy file-server --root /srv --listen :${PORT:-8080}"]
