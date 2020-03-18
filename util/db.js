const mongoose = require('mongoose');
const config = require('../config');

module.exports.connect = () => new Promise(async (resolve, reject) => {
  await mongoose.connect(`${config.mongo.url}/${config.dbName}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, function (err) {
    if (err) {
      return reject(err)
    }
    resolve(mongoose)
  })
});
