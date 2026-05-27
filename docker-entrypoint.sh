#!/bin/sh

# ENV do Angular
cat <<EOF > /usr/share/nginx/html/assets/envs/env.js
window.__env = {
  API_URL: "$API_URL"
};
EOF

# ENV do nginx.conf
envsubst '$API_HOST $API_HOST_PORT' \
  < /etc/nginx/conf.d/nginx.conf.template \
  > /etc/nginx/conf.d/default.conf

# Inicializa nginx
exec nginx -g 'daemon off;'