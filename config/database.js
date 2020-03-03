const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to /shelf succesfully!`);
});

module.exports = mongoose;