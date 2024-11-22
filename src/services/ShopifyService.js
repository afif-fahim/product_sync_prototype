import axios from "axios";

export default class ShopifyService {
  static PRODUCTS_QUERY = `
    query($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  price
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
  `;

  constructor(shopUrl, accessToken) {
    this.shopUrl = shopUrl;
    this.accessToken = accessToken;
  }

  async fetchProducts(cursor = null) {
    try {
      const response = await axios({
        url: `${this.shopUrl}/admin/api/2024-04/graphql.json`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.accessToken,
        },
        data: {
          query: ShopifyService.PRODUCTS_QUERY,
          variables: { cursor },
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Shopify API Error: ${error.message}`);
    }
  }

  normalizeProduct(product, clientId) {
    const variant = product.node.variants.edges[0]?.node;

    return {
      externalId: product.node.id,
      clientId,
      title: product.node.title,
      price: variant?.price,
      stock: variant?.inventoryQuantity,
    };
  }
}
