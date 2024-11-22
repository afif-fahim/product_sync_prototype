import Client from "../models/Client.js";

export default class ClientController {
  static async create(req, res) {
    try {
      const client = await Client.create(req.body);
      res.json({
        success: true,
        client: client.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async list(req, res) {
    try {
      const clients = await Client.findAll();
      res.json({
        success: true,
        clients,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
