class BaseController {
  handleSuccess ({ ctx, data, message = '请求成功' }) {
    ctx.body = { code: 0, data, message }
  }
  handleError ({ ctx, message, code = 1 }) {
    ctx.body = { code, message }
  }
}
module.exports = BaseController
