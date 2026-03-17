FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY config.js /usr/share/nginx/html/config.js
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
