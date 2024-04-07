// Queries
export const GET_ORDERS_BY_USER = `
  query GetOrdersByUser($userID: ID!) {
    getOrdersByUser(userID: $userID) {
      id
      userID
      productIDs
      total
      shippingAddress
      paymentMethod
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = `
  query GetUsers($page: Int, $pageSize: Int, $sortField: String, $sortOrder: String) {
    getUsers(page: $page, pageSize: $pageSize, sortField: $sortField, sortOrder: $sortOrder) {
      id
      username
      email
      firstName
      lastName
      attributes {
        Name
        Value
      }
      tenantID
      createdAt
      updatedAt
    }
  }
`;

export const GET_SELLER_REQUESTS = `
  query GetSellerRequests($userID: ID, $status: String) {
    getSellerRequests(userID: $userID, status: $status) {
      id
      user {
        id
        username
        email
        firstName
        lastName
        tenantID
        createdAt
        updatedAt
      }
      companyName
      cnic
      requestDate
      status
    }
  }
`;

// Define other queries similarly...

// Mutations
export const CREATE_SELLER_REQUEST = `
  mutation CreateSellerRequest($input: RequestInput!) {
    createSellerRequest(input: $input) {
      id
      user {
        id
        username
        email
        firstName
        lastName
        tenantID
        createdAt
        updatedAt
      }
      companyName
      cnic
      requestDate
      status
    }
  }
`;

export const UPDATE_SELLER_REQUEST = `
  mutation UpdateSellerRequest($id: ID!, $status: String!) {
    updateSellerRequest(id: $id, status: $status) {
      id
      user {
        id
        username
        email
        firstName
        lastName
        tenantID
        createdAt
        updatedAt
      }
      companyName
      cnic
      requestDate
      status
    }
  }
`;

