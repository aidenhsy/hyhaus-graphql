const mongoose = require('mongoose');

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`connected to ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
