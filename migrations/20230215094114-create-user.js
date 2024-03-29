'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING(11),
        unique: true
      },
      sex: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      staff: {
        type: Sequelize.STRING
      },
      brithday: {
        type: Sequelize.DATE
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: '请输入密码'
          }
        }
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};