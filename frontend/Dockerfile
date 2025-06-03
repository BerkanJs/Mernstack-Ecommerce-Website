# 1. Base image
FROM node:18 AS builder

# 2. Çalışma dizini oluştur
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package.json package-lock.json* ./
RUN npm install

# 4. ARG ile .env değişkenini al
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 5. Proje dosyalarını kopyala
COPY . .

# 6. Production build al
RUN npm run build

# 7. Production için lightweight image
FROM nginx:stable-alpine

# 8. Custom nginx ayarını doğrudan yaz
RUN echo 'server {\n\
  listen 80;\n\
  server_name localhost;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf

# 9. Build edilen dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# 10. Port
EXPOSE 80

# 11. nginx başlat
CMD ["nginx", "-g", "daemon off;"]
