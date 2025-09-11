FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG API_BASE_URL=http://api:8091
# แทนที่ placeholder ในไฟล์ env.prod ก่อน build
RUN sed -i "s|__API_BASE_URL__|${API_BASE_URL}|g" src/environments/environment.prod.ts

RUN npx ng build --configuration production --output-path=build

FROM nginx:alpine
COPY --from=build /app/build/browser/ /usr/share/nginx/html/
