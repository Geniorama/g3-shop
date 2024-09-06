import { gql } from "graphql-request";

export const GET_LATEST_PRODUCTS = gql`
  query getLatestProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          createdAt
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query getProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          createdAt
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_SLUG = gql`
  query getCollectionBySlug($slug: String, $cursor: String) {
    collection(handle: $slug) {
      id
      title
      handle
      products(first: 9, after: $cursor) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 5) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts($cursor: String, $first: Int!) {
    products(first: $first, after: $cursor) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 5) {
            edges {
              node {
                src
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

