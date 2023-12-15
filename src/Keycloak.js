// Keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'maxstore',
  clientId: 'maxstore-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
