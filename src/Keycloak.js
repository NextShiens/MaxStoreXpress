// Keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'maxstore',
  clientId: 'maxstoreid',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
