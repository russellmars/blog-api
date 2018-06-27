const BaseController = require('./base');
const qiniu = require('qiniu');
const config = require('../config');

const mac = new qiniu.auth.digest.Mac(
  config.qiniu_access_key,
  config.qiniu_secret_key
);
const options = {
  scope: config.qiniu_bucket,
  returnBody: '{"key":"$(key)${ext}","hash":"$(etag)","fsize":$(fsize)}'
};
const putPolicy = new qiniu.rs.PutPolicy(options);

class QiniuController extends BaseController {
  constructor() {
    super();
    // 必须先把对外方法绑定this
    this.index = this.index.bind(this);
  }
  /**
   * 获取列表
   */
  async index(ctx, next) {
    this.handleSuccess({
      ctx,
      data: putPolicy.uploadToken(mac)
    });
  }
}

module.exports = new QiniuController();
