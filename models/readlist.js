const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Readlist extends Model {}

Readlist.init(
  {
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "readlist",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Readlist;
