# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# IMPORTANT: ใน environment.prod.ts ให้ตั้ง
# export const environment = { production: true, apiBaseUrl: '/api' };
RUN npx ng build --configuration production --output-path=build

# ---- Runtime stage ----
FROM nginx:alpine
# ใส่ config สำหรับ SPA fallback (ไม่ต้อง proxy /api ในคอนเทนเนอร์นี้)
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf

# ไฟล์ Angular ที่ build แล้ว
COPY --from=build /app/build/browser/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
