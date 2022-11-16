const { DataTypes } = require('sequelize');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.addColumn('blogs', 'year', {
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
				},
			},
		});
	},
};