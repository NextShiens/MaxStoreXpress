import { useMutation,gql,useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $skip: Int!, $filter: ProductFilterInput) {
    getProducts(limit: $limit, skip: $skip, filter: $filter) {
      id
      name
      price
      maxPrice
      minPrice
      category
      description
      tenantID
      imageUrl
      slug
      brand
      tags
      stock
      discount
      status 
      paymentMethods
    }
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      category
      maxPrice
      minPrice
      description
      imageUrl
      slug
      brand
      tags
      stock
      discount
      tenantID
      paymentMethods
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    UpdateProduct(id: $id, input: $input) {
      id
      name
      price
      category
      maxPrice
      minPrice
      description
      imageUrl
      slug
      brand
      tags
      stock
      discount
      paymentMethods
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($ID: String) {
    deleteProduct(id: $ID)
  }
`;

const UPDATE_PRODUCT_STATUS = gql`
  mutation UpdateProductStatus($id: ID!, $status: String!) {
    updateProductStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;


export const useCreateProduct = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  return createProduct;
};

export const useUpdateProduct = () => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  return updateProduct;
};

export const useDeleteProduct = () => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  return deleteProduct;
};

export const useUpdateProductStatus = () => {
  const [updateProductStatus] = useMutation(UPDATE_PRODUCT_STATUS);

  return updateProductStatus;
};

export const useGetProducts = (limit, skip, filter) => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { limit, skip, filter },
  });

  return { data, loading, error, refetch };
}
