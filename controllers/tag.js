const BaseController = require('./base');
const TagModel = require('../models/tag');
const lodash = require('lodash');

const STATUS_INUSE = 'inuse';
const STATUS_DRAFT = 'draft';
const STATUS_DELETED = 'deleted';

class TagController extends BaseController {
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
    const { page = 1, page_size = 100, keyword = '' } = ctx.query;

    const options = {
      sort: { create_at: -1 },
      page: Number(page),
      limit: Number(page_size)
    };
    const dbQuery = {};

    // keyword 查询
    const keywordReg = new RegExp(keyword)
    dbQuery.$or = [
      { 'name': keywordReg },
      { 'slug': keywordReg },
      { 'description': keywordReg }
    ]

    const tags = await TagModel.find(dbQuery).exec()

    this.handleSuccess({
      ctx,
      data: tags
    })
  }

  /**
   * 新建一篇文章
   */
  async create (ctx, next) {
    const tag = ctx.request.body;
    await new TagModel(tag).save()
    this.handleSuccess({
      ctx
    })
  }

  /**
   * 根据id获取
   */
  async show (ctx, next) {

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

  }
}

module.exports = new TagController()
