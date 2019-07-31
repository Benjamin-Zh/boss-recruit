const mongoose = require('mongoose');
const glob = require('glob');


const DB_URL = 'mongodb://localhost:27017/boss-recruit';

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  glob
    .sync(`${__dirname}/!(index).js`)
    .forEach(model => require(model));

  console.log('mongodb connected...');
});

function getModel(modelName) {
  return mongoose.model(modelName);
}

module.exports = {
  getModel,
};
