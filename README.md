
# 🛒 MERN Stack Ecommerce Website

Modern, ölçeklenebilir ve özellik dolu bir e-ticaret uygulaması.  
React + Vite frontend ile hızlı ve animasyonlu kullanıcı deneyimi,  
Express + Node.js + MongoDB backend ile güçlü API altyapısı,  
Stripe ödeme entegrasyonu ve Redis cache kullanımı ile yüksek performans.

---

## 🎯 Proje Amacı ve Motivasyon

Bu proje, modern web teknolojileri kullanarak tam işlevsel, kullanıcı dostu ve ölçeklenebilir bir e-ticaret platformu geliştirme amacıyla hayata geçirilmiştir. Günümüzde e-ticaret sektörü hızla büyürken, kullanıcılar hem estetik hem de performans açısından yüksek standartlarda siteler bekliyor. Biz de bu ihtiyaçlara cevap verecek; React, Node.js, MongoDB ve Stripe gibi güçlü teknolojileri entegre ederek, hem kullanıcılar hem de satıcılar için kolay ve güvenli bir alışveriş deneyimi sunmayı hedefledik.

Projeyi geliştirirken şu motivasyonlar ön plandaydı:

- ⚡ **Kullanıcı Deneyimi:** Hızlı yüklenen, duyarlı ve görsel açıdan çekici bir arayüz oluşturmak.  
- 🔐 **Güvenlik:** JWT tabanlı oturum yönetimi ve güvenli ödeme altyapısı ile kullanıcı verilerini korumak.  
- 🚀 **Ölçeklenebilirlik:** Modern backend yapısıyla kolayca yeni özellikler eklenebilir ve büyüyebilir bir sistem inşa etmek.  
- 📚 **Öğrenme ve Deneyim:** MERN stack ve Stripe entegrasyonu gibi güncel teknolojileri gerçek dünya projesinde uygulayarak bilgi ve becerileri derinleştirmek.



---

## ✨ Özellikler

- 👤 **Kullanıcı Yönetimi:** Kayıt, Giriş, JWT tabanlı kimlik doğrulama, Refresh Token  
- 🛍️ **Ürün Yönetimi:** Ürün listeleme, kategori bazlı filtreleme, önerilen ürünler, öne çıkan ürünler  
- 🛒 **Sepet İşlemleri:** Sepete ürün ekleme, miktar güncelleme, tüm sepeti temizleme  
- 🎟️ **Kupon Sistemi:** Kupon oluşturma, geçerlilik kontrolü, kupon kullanımı  
- 💳 **Ödeme:** Stripe tabanlı güvenli ödeme işlemleri ve başarılı ödeme sonrası işlemler  
- 🎨 **Gelişmiş Frontend:** Modern sliderlar, ürün arama, kategori filtreleme, animasyonlar (framer-motion)  
- 🔒 **Admin Yetkileri:** Ürün ekleme, silme, öne çıkarma işlemleri için korumalı rotalar  
- ⚡ **Cache:** Redis ile performans ve hız optimizasyonu  
- ☁️ **Bulut Entegrasyonu:** Cloudinary ile medya yönetimi
- 🐳 Docker Frontend, backend  için çoklu ya da tek konteyner Docker yapısı
 



---

## 🛠️ Teknolojiler

| Kısım     | Teknolojiler                                                                                 |
|-----------|---------------------------------------------------------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS, Zustand, React Router DOM, Axios, framer-motion, lucide-react |
| Backend   | Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, Stripe SDK, Cloudinary, ioredis Redis  |
| Araçlar   | Nodemon, ESLint, dotenv, cookie-parser                                                      |

---

## 📁 Proje Yapısı (Özet)

```
Mernstack-Ecommerce-Website/
├── backend/
│   ├── controllers/           # API işlemleri
│   ├── middleware/            # Auth, admin kontrol, hata yakalama
│   ├── models/                # Mongoose modelleri
│   ├── routes/                # API route'ları (auth, cart, coupon, payment, product)
│   ├── utils/                 # Cloudinary, Stripe, DB bağlantısı, Redis
│   └── server.js              # Express sunucu başlangıcı
│
├── frontend/
│   ├── src/
│   │   ├── components/        # UI bileşenleri ve sliderlar
│   │   ├── context/           # Zustand ile global durum yönetimi
│   │   ├── stores/            # Özel store'lar
│   │   ├── pages/             # Sayfalar (Ana sayfa, ürün detay, sepet, kullanıcı vs.)
│   │   └── main.jsx           # React uygulama giriş noktası
│   └── vite.config.js         # Vite yapılandırması
│
├── package.json
├── .gitignore
└── README.md
```

---

## 🔗 Backend API Örnekleri

### Auth Routes (`/api/auth`)

```http
POST /signup         # Kullanıcı kaydı
POST /login          # Giriş
POST /logout         # Çıkış
POST /refresh-token  # Token yenileme
GET /profile         # Kullanıcı profil bilgisi (korumalı)
```

### Cart Routes (`/api/cart`)

```http
GET /                # Sepetteki ürünleri listele (korumalı)
POST /               # Sepete ürün ekle (korumalı)
DELETE /             # Sepeti boşalt (korumalı)
PUT /:id             # Sepetteki ürün miktarını güncelle (korumalı)
```

### Coupon Routes (`/api/coupons`)

```http
GET /                # Tüm kuponları getir (korumalı)
POST /validate       # Kupon geçerliliğini kontrol et (korumalı)
POST /create         # Kupon oluştur (korumalı)
```

### Payment Routes (`/api/payment`)

```http
POST /create-checkout-session  # Stripe ödeme sayfası oluştur (korumalı)
POST /checkout-success          # Ödeme başarılı sonrası işlemler (korumalı)
```

### Product Routes (`/api/products`)

```http
GET /                        # Tüm ürünler
GET /featured                # Öne çıkan ürünler
GET /category/:category      # Kategoriye göre ürünler
GET /recommendations         # Önerilen ürünler
POST /                      # Yeni ürün ekle (admin)
PATCH /:id                  # Ürün öne çıkarma toggle (admin)
DELETE /:id                 # Ürün silme (admin)
```

---

## ⚙️ Önemli Backend Modüller

- MongoDB Bağlantısı  
- Cloudinary Konfigürasyonu  
- Redis Bağlantısı (ioredis)  
- Stripe Entegrasyonu  

---

## 🌟 Frontend Öne Çıkanlar

- Ürün arama ve kategori bazlı filtreleme  
- Çoklu modern slider ve animasyonlar (framer-motion)  
- Zustand ile global state yönetimi  
- React Router DOM ile sayfa geçişleri  
- Axios ile backend API çağrıları  
- Stripe.js entegrasyonu  
- Tailwind CSS ile modern ve responsive tasarım  
- React-hot-toast ile kullanıcıya anlık bildirimler  

---

## 🚀 Kurulum ve Çalıştırma

```bash
# Repo klonla
git clone https://github.com/kullaniciAdi/Mernstack-Ecommerce-Website.git
cd Mernstack-Ecommerce-Website

# Backend bağımlılıkları
npm install

# Frontend bağımlılıkları
npm install --prefix frontend

# Ortam değişkenleri (.env)
# Backend/.env içine aşağıdakileri ekle
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
ACCESS_TOKEN_SECRET=access_token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret

# Geliştirme sunucularını başlat
npm run dev          # Backend için
npm run dev --prefix frontend  # Frontend için

# Tarayıcıda aç
http://localhost:3000
```

---

---

---

## 📬 İletişim

Proje hakkında soru sormak veya iş birliği yapmak isterseniz, aşağıdan ulaşabilirsiniz:

- GitHub: [BerkanJs](https://github.com/BerkanJs)
- E-posta: berkanozcelik3.6@gmail.com

Teşekkürler! 🙌






