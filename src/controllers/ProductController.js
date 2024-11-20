import SyncService from "../services/SyncService.js";
import Client from "../models/Client.js";

export default class ProductController {
  static async list(req, res) {
    const clientId = req.params.clientId;

    try {
      const client = await Client.findByPk(clientId);
      const service = SyncService.getServiceInstance(client);
      let allProducts = [];

      let hasNextPage = true;
      let cursor = null;

      while (hasNextPage) {
        const result = await service.fetchProducts(cursor);
        const products = result.data.products.edges.map((product) =>
          service.normalizeProduct(product, client.id)
        );

        allProducts = allProducts.concat(products);

        hasNextPage = result.data.products.pageInfo.hasNextPage;
        cursor = result.data.products.pageInfo.endCursor;
      }

      res.json({
        success: true,
        count: allProducts.length,
        products: allProducts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
