const express = require('express');
const app = express();
const cors = require('cors');
const { router } = require('./routes');

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use('/mock-api', router);

app.listen(PORT, () => console.log(`mocked server running on port: ${PORT}`));
