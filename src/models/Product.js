import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Client from "./Client.js";

const Product = sequelize.define(
  "Product",
  {
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
  }
);

Product.belongsTo(Client);
Client.hasMany(Product);

export default Product;
