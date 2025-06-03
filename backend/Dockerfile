# Temel image
FROM node:18-alpine

# Çalışma dizini oluştur
WORKDIR /app

# Paket dosyalarını kopyala ve yükle
COPY package*.json ./
RUN npm install --production

# Uygulama dosyalarını kopyala
COPY . .

# Çevre değişkeni
ENV NODE_ENV=production

# Uygulama portu
EXPOSE 5000

# Başlatma komutu
CMD ["node", "server.js"]
