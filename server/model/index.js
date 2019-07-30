const mongoose = require('mongoose');


const DB_URL = 'mongodb://localhost:27017/boss-recruit';

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('mongodb connected...');
});

// const User = mongoose.model('user', new mongoose.Schema({
//   userName: { type: String, require: true },
//   age: { type: Number, require: true },
// }));
