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
git clone https://github.com/wyrntva/Kiddo.git /www/wwwroot/kiddo
cd /www/wwwroot/kiddo
```

### 3. Tạo file `.env` cho backend

```bash
cat > /www/wwwroot/kiddo/backend/.env << 'EOF'
DATABASE_URL="postgresql://kiddo:kiddo_password@db:5432/kiddo_db"
JWT_ACCESS_SECRET="your-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=production
CLIENT_URL="https://ottopia.vn"
EOF
```

### 4. Build và khởi động containers

```bash
cd /www/wwwroot/kiddo
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
cd /www/wwwroot/kiddo

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
