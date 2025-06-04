# 1. Build aşaması
FROM node:18 AS builder

# 2. Çalışma dizini
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package.json package-lock.json* ./
RUN npm install

# 4. Ortam değişkeni alma (opsiyonel)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 5. Proje dosyalarını kopyala ve build al
COPY . .
RUN npm run build

# 6. Production için nginx image
FROM nginx:stable-alpine

# 7. Build edilmiş dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# 8. Nginx SPA yönlendirmesi için özel config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 9. Port aç
EXPOSE 80

# 10. Başlat
CMD ["nginx", "-g", "daemon off;"]
