import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const Client = sequelize.define(
  "Client",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.ENUM("shopify", "woocommerce"),
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Client;
