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
COPY --from=builder /app/dist /usr/share/nginx/html

# 8. Port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
