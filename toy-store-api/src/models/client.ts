import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/db";

export interface ClientAttributes {
  id?: number;
  nomeCompleto: string;
  email: string;
  nascimento: Date;
}

export interface ClientCreationAttributes
  extends Optional<ClientAttributes, "id"> {}

export class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: number;
  public nomeCompleto!: string;
  public email!: string;
  public nascimento!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: false,
  }
);

export default Client;
