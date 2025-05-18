'use strict';
module.exports = {
  up: async (qi) => {
    await qi.bulkInsert('categories', [
      { id: '00000000-0000-0000-0000-000000000001', name: 'General', created_at: new Date(), updated_at: new Date() },
      { id: '00000000-0000-0000-0000-000000000002', name: 'Work', created_at: new Date(), updated_at: new Date() },
      { id: '00000000-0000-0000-0000-000000000003', name: 'Personal', created_at: new Date(), updated_at: new Date() },
      { id: '00000000-0000-0000-0000-000000000004', name: 'Urgent', created_at: new Date(), updated_at: new Date() },
      { id: '00000000-0000-0000-0000-000000000005', name: 'Health', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (qi) => qi.bulkDelete('categories', null, {})
};
