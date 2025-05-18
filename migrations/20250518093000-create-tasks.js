'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('tasks', {
      id: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      priority: {type: Sequelize.STRING, allowNull: false},
      completed: { type: Sequelize.BOOLEAN, defaultValue: false },
      due_date: Sequelize.DATE,
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onDelete: 'RESTRICT'
      },
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
    
    await qi.addIndex('tasks', ['user_id'], {
      name: 'idx_tasks_user_id',
    });
    await qi.addIndex('tasks', ['category_id'], {
      name: 'idx_tasks_category_id',
    });
    await qi.addIndex('tasks', ['due_date'], {
      name: 'idx_tasks_due_date',
    });
  },
  down: async (qi) => qi.dropTable('tasks')
};
