import { WebStorageStateStore } from 'oidc-client';



export const ADMIN_ROLE = 'Admin';
export const SELLER_ROLE = 'Seller';
export const BUYER_ROLE = 'Buyer';
export const STAFF_ROLE = 'Staff';
export const GUEST_ROLE = 'Guest';
export const SUPPORT_ROLE = 'Support';
export const USER_ROLE = 'User';
export const SUPER_ADMIN_ROLE = 'SuperAdmin';


export const USER_ROLES = [
    ADMIN_ROLE,
    SELLER_ROLE,
    BUYER_ROLE,
    STAFF_ROLE,
    GUEST_ROLE,
    SUPPORT_ROLE,
    USER_ROLE,
    SUPER_ADMIN_ROLE
    ];

export const OPEN_ID_ISSUER = process.env.REACT_APP_OPEN_ID_ISSUER || "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_vmOgPnqzT";
export const OPEN_ID_CLIENT_ID = process.env.REACT_APP_OPEN_ID_CLIENT_ID || "6c36b2mbh4i7ohplokggiui8s3";
export const WEBAPP_DOMAIN = process.env.NODE_ENV === "production" ? "https://e-store-react.vercel.app/" : "http://localhost:3000/";
export const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI    || "localhost:4000/graphql";
export const REACT_APP_AWS_REGION = process.env.REACT_APP_AWS_REGION || "us-east-1";

export const oidcConfig = {
    authority: OPEN_ID_ISSUER ,
    client_id:OPEN_ID_CLIENT_ID,
    redirect_uri:WEBAPP_DOMAIN,
    moniterSession: false,
    response_type: "code",
    post_logout_redirect_uri: WEBAPP_DOMAIN,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  
  };