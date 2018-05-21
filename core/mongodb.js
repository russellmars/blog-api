const mongoose = require('mongoose');
const config = require('../config')

exports.connect = function() {
  return mongoose.connect(config.mongo_uri, {
    user: config.mongo_user,
    pass: config.mongo_pass
  }).then(
    () => {
      console.log('数据库连接成功!');
    },
    error => {
      console.log('数据库连接失败!', error);
    }
  );
};
