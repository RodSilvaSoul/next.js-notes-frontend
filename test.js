const a = [
  {
    id: 1,
    name: '1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '3',
  },
];

const ne = {
  id: 3,
  name: '4',
};

const updated = [...a, ne];

console.log(updated);