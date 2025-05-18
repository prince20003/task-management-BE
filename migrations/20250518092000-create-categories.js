'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('categories', {
      id: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true
      },
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
    // await qi.addIndex('categories', ['name']);
    await qi.addIndex('categories', ['name'], {
      name: 'idx_categories_name',
    });

  },
  down: async (qi) => qi.dropTable('categories')
};
