'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */



    const productArr = [];
    for (let i = 0; i < 100; i++) {
      productArr.push({
        name: `房间${i}`,
        address: `房间${i}-详情`,
        price: i,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    // users => 表名
    return queryInterface.bulkInsert('products', productArr, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
