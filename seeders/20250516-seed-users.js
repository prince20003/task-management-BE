'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (qi) => {
    const hash = await bcrypt.hash('Password@1', 10);
    await qi.bulkInsert('users', [
      { id: '11111111-1111-1111-1111-111111111111', name: 'Jhon Due' ,email: 'test@gmail.com', password_hash: hash, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  down: async (qi) => qi.bulkDelete('users', null, {})
};