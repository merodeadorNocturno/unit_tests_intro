const express = require('express');
const app = express();
const port = 3000;
const scheduleRoutes = require('./routes/schedule');

app.use(express.json());
app.use('/schedule', scheduleRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the School Schedule API!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
