FROM caddy:2-alpine
WORKDIR /srv
COPY . /srv
# Caddyfile не раздаём как статику — уносим в /etc/caddy.
RUN mv /srv/Caddyfile /etc/caddy/Caddyfile
CMD ["sh","-c","caddy run --config /etc/caddy/Caddyfile --adapter caddyfile"]
