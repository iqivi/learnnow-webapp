# FAZA 1: BUILD (Środowisko Node.js do kompilacji)
# FAZA 1: BUILD (Budowanie)
FROM node:20-alpine AS builder

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie zależności
# ZMIANA: Usuwamy package-lock.json z komendy COPY
COPY package.json ./ 

# Instalacja zależności (tu zostanie wygenerowany package-lock.json wewnątrz kontenera)
RUN npm install 

# Kopiowanie reszty kodu źródłowego
COPY . .

# Budowanie aplikacji (wynik w folderze /app/build)
RUN npm run build
# ... reszta Dockerfile bez zmian


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
