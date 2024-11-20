import ShopifyService from "./ShopifyService.js";

export default class SyncService {
  static getServiceInstance(website) {
    if (website.provider === "shopify") {
      return new ShopifyService(website.url, website.apiKey);
    }
    throw new Error("Unsupported provider");
  }
}
