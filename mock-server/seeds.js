const faker = require('faker');

const notes = Array.from({ length: 3 }).map(() => ({
  id: faker.datatype.number(),
  title: faker.random.word(),
  note: faker.random.words(),
  isOnTrash: false,
  isArchived: false,
}));

module.exports = { notes };
