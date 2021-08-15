const { Router } = require('express');
const faker = require('faker');
const { notes } = require('./seeds');

let data = notes;

const router = Router();

router.get('/notes', async (req, res) => {
  res.json(data);
});

router.post('/notes', async (req, res) => {
  const { title, note } = req.body;

  data.push({
    id: faker.datatype.number(),
    title,
    note,
    isArchived: false,
    isOnTrash: false,
  });

  res.sendStatus(201);
});

router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;

  const noteId = Number(id);
  const index = data.findIndex((noteData) => noteData.id === noteId);
  if (index > -1) {
    const { title, note, isOnTrash, isArchived } = req.body;
    const newData = Object.assign({}, notes[index], {
      title,
      note,
      isArchived,
      isOnTrash,
    });
    data[index] = newData;
  }

  res.sendStatus(200);
});

router.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const noteId = Number(id);

  const newData = data.filter((noteData) => noteData.id !== noteId);
  data = newData;
  res.sendStatus(200);
});

module.exports = { router };
