FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html/
# healthz
RUN echo "ok" > /usr/share/nginx/html/healthz
# reverse proxy ผ่าน Nginx ด้านหน้าอีกชั้น (ไฟล์นี้เสิร์ฟแบบ static)
EXPOSE 80
