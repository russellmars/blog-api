const mongoose = require('mongoose');

// 文章模型
const articleSchema = new mongoose.Schema({
  // 文章标题
  title: {
    type: String,
    require: true,
    maxlength: 50
  },

  // 文章关键字（SEO）
  keywords: [{ type: String, maxlength: 20 }],

  // 文章描述
  description: {
    type: String,
    require: true,
    maxlength: 200
  },

  // 文章内容
  content: {
    type: String,
    require: true,
    maxlength: 100000
  },

  // 缩略图
  thumb: {
    type: String,
    require: true,
    maxlength: 200
  },

  // 文章发布状态 => -1回收站，0草稿，1已发布
  state: { type: Number, default: 1 },

  // 发布日期
  create_at: { type: Date, default: Date.now },

  // 最后修改日期
  update_at: { type: Date, default: Date.now },

  // 文章标签
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

  // 文章分类
  category: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
  ],

  // 其他元信息
  meta: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  }
});

// 文章模型
const Article = mongoose.model('Article', articleSchema);

// export
module.exports = Article;
