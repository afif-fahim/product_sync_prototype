import ShopifyService from "./ShopifyService.js";
import Product from "../models/Product.js";
import { sequelize } from "../configs/database.js";

export default class SyncService {
  static async syncProducts(client) {
    const service = this.getServiceInstance(client);
    let allProducts = [];

    if (client.provider === "shopify") {
      let hasNextPage = true;
      let cursor = null;

      while (hasNextPage) {
        const result = await service.fetchProducts(cursor);
        const products = result.data.products.edges.map((product) =>
          service.normalizeProduct(product, client.id)
        );

        await this.upsertProducts(products);
        allProducts = allProducts.concat(products);

        hasNextPage = result.data.products.pageInfo.hasNextPage;
        cursor = result.data.products.pageInfo.endCursor;
      }
    } else if (client.provider === "woocommerce") {
      // TODO
    }

    return allProducts.length;
  }

  static async upsertProducts(products) {
    const transaction = await sequelize.transaction();

    try {
      for (const product of products) {
        await Product.upsert(product, {
          transaction,
          fields: ["clientId", "externalId", "title", "price", "stock"],
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static getServiceInstance(client) {
    if (client.provider === "shopify") {
      return new ShopifyService(client.url, client.apiKey);
    } else if (client.provider === "woocommerce") {
      // TODO
    }
    throw new Error("Unsupported provider");
  }
}
