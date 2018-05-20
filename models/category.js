const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  // 名称
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  // 别名
  slug: {
    type: String,
    required: true,
    maxlength: 10
  },
  // 描述
  description: {
    type: String,
    maxlength: 200,
    default: ''
  },
  // 创建时间
  create_at: { type: Date, default: Date.now, index: true },
  // 更新时间
  update_at: { type: Date, default: Date.now, index: true }
});

categorySchema.pre('findOneAndUpdate', function (next) {
  this.update_at = Date.now
  next()
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
