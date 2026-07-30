# Hướng dẫn Deploy KIDDO

## Yêu cầu hệ thống

- Docker >= 20.x
- Docker Compose >= 2.x
- Git
- Server: Ubuntu 20.04+

## Cấu trúc dự án

```
kiddo/
├── frontend/           # React + Vite + TailwindCSS
│   ├── Dockerfile      # Dev
│   └── Dockerfile.prod # Production (nginx)
├── backend/            # Node.js + Express + Prisma
│   ├── Dockerfile      # Production (multi-stage)
│   └── Dockerfile.dev  # Development (ts-node-dev)
├── docker-compose.yml      # Development
└── docker-compose.prod.yml # Production
```

## Lần đầu deploy (server mới)

### 1. Cài Docker

```bash
curl -fsSL https://get.docker.com | sh
```

### 2. Clone repo

```bash
git clone https://github.com/wyrntva/Kiddo.git /www/wwwroot/cms.ottopia.vn
cd /www/wwwroot/cms.ottopia.vn
```

### 3. Tạo file `.env` tại thư mục gốc

```bash
cat > /www/wwwroot/cms.ottopia.vn/.env << 'EOF'
POSTGRES_PASSWORD="kiddo_password"
JWT_ACCESS_SECRET="your-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"
CLIENT_URL="http://ottopia.vn,https://ottopia.vn,https://cms.ottopia.vn"
GOOGLE_CLIENT_ID="21158134674-9htgtdc8j7411ca94m8pfcebcco0nq84.apps.googleusercontent.com"
GA4_PROPERTY_ID="546422418"
GA4_CLIENT_EMAIL="ottopia-analytics-reader@exalted-crane-499111-d6.iam.gserviceaccount.com"
GA4_PRIVATE_KEY="your-ga4-private-key"
GA4_MOCK="false"

# AI Assistant & Facebook Webhook configuration
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-4o-mini"
FACEBOOK_VERIFY_TOKEN="ottopia_toro_verify_token_2026"
FACEBOOK_PAGE_ACCESS_TOKEN=""
EOF
```

### 4. Build và khởi động containers

```bash
cd /www/wwwroot/cms.ottopia.vn
docker compose -f docker-compose.prod.yml up --build -d
```

### 5. Cấu hình nginx (BT Panel)

Sửa file `/www/server/panel/vhost/nginx/ottopia.vn.conf`:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name ottopia.vn www.ottopia.vn;

    ssl_certificate    /www/server/panel/vhost/cert/ottopia.vn/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/ottopia.vn/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    error_page 497 https://$host$request_uri;

    location ~ \.well-known { allow all; }

    location / {
        proxy_pass http://127.0.0.1:3080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Sửa file `/www/server/panel/vhost/nginx/cms.ottopia.vn.conf`:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name cms.ottopia.vn;

    ssl_certificate    /www/server/panel/vhost/cert/cms.ottopia.vn/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/cms.ottopia.vn/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    error_page 497 https://$host$request_uri;

    location ~ \.well-known { allow all; }

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
}
```

Reload nginx:

```bash
/www/server/nginx/sbin/nginx -t && /www/server/nginx/sbin/nginx -s reload
```

---

## Cập nhật code (lần sau)

Đây là quy trình cập nhật khi code thay đổi:

```bash
cd /www/wwwroot/cms.ottopia.vn

# Pull code mới
git pull origin main

# Rebuild và restart containers
docker compose -f docker-compose.prod.yml up --build -d

# Kiểm tra trạng thái
docker ps
```

---

## Kiểm tra hệ thống

```bash
# Xem các container đang chạy
docker ps

# Xem log backend
docker logs kiddo_backend --tail 50

# Xem log frontend
docker logs kiddo_frontend --tail 20

# Xem log database
docker logs kiddo_db --tail 20

# Health check
curl http://localhost:3080/          # Frontend
curl http://localhost:5000/health    # Backend
```

---

## Các port đang dùng

| Service   | Port nội bộ | Truy cập ngoài           |
|-----------|-------------|--------------------------|
| Frontend  | 3080        | https://ottopia.vn       |
| Backend   | 5000        | https://cms.ottopia.vn   |
| Database  | 5433        | Chỉ nội bộ               |

---

## Dừng / Khởi động lại

```bash
# Dừng tất cả
docker compose -f docker-compose.prod.yml down

# Khởi động lại không rebuild
docker compose -f docker-compose.prod.yml up -d

# Rebuild toàn bộ (khi thay đổi Dockerfile)
docker compose -f docker-compose.prod.yml up --build -d
```

---

## Xử lý sự cố

### Backend không kết nối được database

```bash
docker logs kiddo_db
docker exec kiddo_db pg_isready -U kiddo -d kiddo_db
```

### Frontend hiển thị 502 Bad Gateway

```bash
docker ps | grep kiddo_frontend  # Kiểm tra container đang chạy
docker logs kiddo_frontend
```

### Chạy migration thủ công

```bash
docker exec kiddo_backend npx prisma migrate deploy
```
