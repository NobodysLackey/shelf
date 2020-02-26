const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shelves', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
});