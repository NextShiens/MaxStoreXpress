
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM caddy:2.4.5-alpine
COPY --from=build /app/build /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

ENV REACT_APP_KEYCLOAK_URL=http://localhost:8080/
ENV REACT_APP_KEYCLOAK_REALM=maxstore
ENV REACT_APP_KEYCLOAK_CLIENT_ID=maxstore-client
