import axios from "axios";

export default class WooCommerceService {
  constructor(siteUrl, consumerKey, consumerSecret) {
    this.siteUrl = siteUrl;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  async fetchProducts(page = 1) {
    try {
      const response = await axios({
        url: `${this.siteUrl}/wp-json/wc/v3/products`,
        method: "GET",
        params: {
          page,
          per_page: 50,
        },
        auth: {
          username: this.consumerKey,
          password: this.consumerSecret,
        },
      });

      return {
        data: response.data,
        hasMore: response.headers.link?.includes('rel="next"') ?? false,
      };
    } catch (error) {
      throw new Error(`WooCommerce API Error: ${error.message}`);
    }
  }

  normalizeProduct(product, clientId) {
    return {
      externalId: product.id.toString(),
      clientId,
      title: product.name,
      price: product.price,
      stock: product.stock_quantity || 0,
    };
  }
}
