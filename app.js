const express = require('express');
const cors = require('cors');
const { initializeDB, sequelize } = require('./config/db-config');
require('dotenv').config();

const routes = require('./routes');
// const {  } = require("./services");

const app = express();
// const { PORT } = process.env;
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
);

app.listen(port, async () => {
  try {
    await initializeDB();
    // await userService.createFirstAdmin();
    await sequelize.sync();
    console.log(`Listening on port ${port}..`);
  } catch (err) {
    console.error('Error initializing DB.', err);
  }
});

app.use('/api/v1', routes);

// router controller service provider
