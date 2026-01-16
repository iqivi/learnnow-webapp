# FAZA 1: BUILD (Budowanie)
FROM node:20-alpine AS builder

# Build argument dla API URL
ARG VITE_API_URL=http://localhost:8080/api

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie zależności
COPY package.json ./ 

# Instalacja zależności
RUN npm install 

# Kopiowanie reszty kodu źródłowego
COPY . .

# Budowanie aplikacji (wynik w folderze /app/dist)
# Przekazanie VITE_* zmiennych podczas budowania
RUN VITE_API_URL=${VITE_API_URL} npm run build


# ------------------------------------------------------------------
# FAZA 2: SERVE (Lekki serwer Nginx)
FROM nginx:1.25.3-alpine

# Kopiowanie konfiguracji Nginx z hosta
COPY ./nginx/conf/react.conf /etc/nginx/conf.d/default.conf

# Kopiowanie SKOMPILOWANYCH, statycznych plików z fazy 'builder'
#COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
