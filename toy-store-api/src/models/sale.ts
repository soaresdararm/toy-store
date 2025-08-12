import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/db";
import Client from "./client";

export interface SaleAttributes {
  id?: number;
  clientId: number;
  value: number;
  date: Date;
}

export interface SaleCreationAttributes
  extends Optional<SaleAttributes, "id"> {}

class Sale
  extends Model<SaleAttributes, SaleCreationAttributes>
  implements SaleAttributes
{
  public id!: number;
  public clientId!: number;
  public value!: number;
  public date!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sales",
    timestamps: false,
  }
);

Client.hasMany(Sale, { foreignKey: "clientId" });
Sale.belongsTo(Client, { foreignKey: "clientId" });

export default Sale;
