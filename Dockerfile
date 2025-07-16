# 1. Usa un'immagine ufficiale di Node.js per la build
FROM node:18-alpine AS build

# 2. Imposta la working directory
WORKDIR /app

# 3. Copia package.json e installa dipendenze
COPY package*.json ./
RUN npm install

# 4. Copia tutto il codice e builda l'app
COPY . .
RUN npm run build

# 5. Usa Nginx per servire i file statici
FROM nginx:alpine

# 6. Copia i file buildati nella directory pubblica di nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Copia una configurazione custom di Nginx (opzionale, utile per SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]