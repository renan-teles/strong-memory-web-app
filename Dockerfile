# -------------------------
# 1. Build da aplicação Angular
# -------------------------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build de produção
RUN npm run build -- --configuration=production


# -------------------------
# 2. Servir com Nginx
# -------------------------
FROM nginx:alpine

# copia build gerado
COPY --from=build /app/dist/strong-memory-web-app/browser /usr/share/nginx/html

# remove config default (opcional, mas recomendado)
RUN rm /etc/nginx/conf.d/default.conf

# config custom do nginx (SPA Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# script que injeta variáveis
COPY ./docker-entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]

EXPOSE 4200