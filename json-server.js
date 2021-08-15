const faker = require('faker');

module.exports = () => {
  const data = { notes: [] };

  Array.from({ length: 15 }).forEach(() => {
    data.notes.push({
      id: faker.datatype.number(),
      title: faker.random.word(),
      note: faker.random.words(),
      isOnTrash: false,
      isArchived: false,
    });
  });

  return data;
};
