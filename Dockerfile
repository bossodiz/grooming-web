# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/boss-grooming/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
