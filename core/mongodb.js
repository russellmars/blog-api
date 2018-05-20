const mongoose = require('mongoose');

exports.connect = function() {
  return mongoose.connect('mongodb://localhost:27017/blog').then(
    () => {
      console.log('数据库连接成功!');
    },
    error => {
      console.log('数据库连接失败!', error);
    }
  );
};
