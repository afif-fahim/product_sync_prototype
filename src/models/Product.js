import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Client from "./Client.js";

const Product = sequelize.define(
  "Product",
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["client_id", "external_id"],
      },
    ],
  }
);

Product.belongsTo(Client, {
  foreignKey: {
    name: "clientId",
    allowNull: false,
  },
});
Client.hasMany(Product, {
  foreignKey: {
    name: "clientId",
    allowNull: false,
  },
});

export default Product;
