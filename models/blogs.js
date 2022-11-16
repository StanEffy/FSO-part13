const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [1991],
					msg: 'Minimum year is 1991',
				},
				max: {
					args: [new Date().getFullYear()],
					msg: `Maximum year is ${new Date().getFullYear()}`,
				}
			},
		},
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blogpost",
    freezeTableName: true,
  }
);

module.exports = Blog;
