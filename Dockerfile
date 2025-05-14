# Etapa 1: build do Angular
FROM node:16 AS build-stage

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: nginx para servir o Angular
FROM nginx:alpine

# Remove o index.html padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados do Angular
COPY --from=build-stage /app/dist/clientes-app /usr/share/nginx/html

# Copia configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
