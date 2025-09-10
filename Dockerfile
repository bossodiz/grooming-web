# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# สั่ง build ออกไปที่โฟลเดอร์ /app/build (ตัดปัญหา dist/<app-name>)
RUN npm run build -- --configuration production --output-path=build

# ---- Runtime stage ----
FROM nginx:alpine
# Nginx config สำหรับ SPA (Angular)
COPY deploy/nginx.default.conf /etc/nginx/conf.d/default.conf
# คัดลอกผล build ไปเสิร์ฟ
COPY --from=build /app/build/browser/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
