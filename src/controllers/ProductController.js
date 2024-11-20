import Product from "../models/Product.js";
import Client from "../models/Client.js";
import SyncService from "../services/SyncService.js";

export default class ProductController {
  static async sync(req, res) {
    const clientId = parseInt(req.params.clientId);

    try {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          error: "Client not found",
        });
      }

      const syncedCount = await SyncService.syncProducts(client);
      res.json({
        success: true,
        productsSynced: syncedCount,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async list(req, res) {
    const clientId = parseInt(req.params.clientId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    try {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          error: "Client not found",
        });
      }

      const { count, rows } = await Product.findAndCountAll({
        where: { client_id: clientId },
        limit,
        offset,
      });

      res.json({
        success: true,
        products: rows,
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
