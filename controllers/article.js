const BaseController = require('./base');
const ArticleModel = require('../models/article');
const lodash = require('lodash');

const STATUS_INUSE = 'inuse';
const STATUS_DRAFT = 'draft';
const STATUS_DELETED = 'deleted';

class ArticleController extends BaseController {
  constructor () {
    super()
    // 必须先把对外方法绑定this
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
    this.show = this.show.bind(this)
    this.destroy = this.destroy.bind(this)
    this.update = this.update.bind(this)
    this.modify = this.modify.bind(this)
  }
  /**
   * 获取列表
   */
  async index(ctx, next) {
    const { page, page_size, state, keyword, date, hot, category } = ctx.query;

    const options = {
      sort: { create_at: -1 },
      page: Number(page || 1),
      limit: Number(page_size || 10),
      populate: ['category', 'tag'],
      select: '-content'
    };
    const dbQuery = {};
    // state 查询
    if (lodash.includes([STATUS_INUSE, STATUS_DRAFT, STATUS_DELETED], state)) {
      dbQuery.state = state;
    }
    // keyword 查询
    if (lodash.isString(keyword) && lodash.trim(keyword) !== '') {
      const kw = lodash.trim(keyword);
      if (kw !== '') {
        const reg = new RegExp(kw);
        dbQuery.$or = ['title', 'content', 'description'].map(item => {
          return { [item]: reg };
        });
      }
    }
    // 分类id查询
    if (category) {
      dbQuery.category = category;
    }
    // 发布时间查询
    if (date) {
      const getDate = new Date(date);
      if (!Object.is(getDate.toString(), 'Invalid Date')) {
        dbQuery.create_at = {
          $gte: getDate,
          $lt: new Date(getDate + 1000 * 60 * 60 * 24)
        };
      }
    }
  }

  /**
   * 新建一篇文章
   */
  async create (ctx, next) {
  }

  /**
   * 根据id获取
   */
  async show (ctx, next) {
    this.handleSuccess({
      ctx,
      data: 'hello world'
    })
  }

  /**
   * 根据id删除
   */
  async destroy(ctx, next) {}

  /**
   * 更新数据
   */
  async update(ctx, next) {}

  /**
   * 修改状态
   */
  async modify(ctx, next) {
    const { articles, action } = ctx.request.body;
    if (
      lodash.isEmpty(articles) ||
      !lodash.includes([STATUS_INUSE, STATUS_DRAFT, STATUS_DELETED], action)
    ) {
      return this.handleError({
        ctx,
        message: '参数缺失或无效'
      });
    }
    const result = await ArticleModel.update(
      { _id: { $in: articles } },
      { $set: updatePart },
      { multi: true }
    );
    return this.handleSuccess({
      ctx,
      message: '修改成功'
    });
  }
}

module.exports = new ArticleController()
