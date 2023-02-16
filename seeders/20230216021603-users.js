'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const usersArr = [];
    for (let i = 0; i < 100; i++) {
      let phone = '000';
      if(i<10){
        phone = `00${i}`
      }else if(i=>10&&i<100){
        phone = `0${i}`
      }

        usersArr.push({
            username: `user${i}`,
            password: `user${i}`,
            phone: `12345678${phone}`,
           sex:'1',
           createdAt:new Date(),
           updatedAt: new Date()
        })
    }
    // users => 表名
    return queryInterface.bulkInsert('users', usersArr, {});
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
