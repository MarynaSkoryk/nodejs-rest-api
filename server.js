const mongoose = require('mongoose');

const app = require('./app');

const DB_CONTACTS =
  'mongodb+srv://Maryna:EVU7Lq4DYyUQdtN9@cluster0.iluanvl.mongodb.net/test';

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// T9InJcxIFkAPGvCH
