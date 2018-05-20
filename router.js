const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router({
  prefix: '/api/v1'
});

const article = controllers.article;
router.get('/article', article.index);
router.patch('/article', article.modify);
router.post('/article', article.create);
router.delete('/article', article.destroy);
router.get('/article/:_id', article.show);
router.put('/article/:_id', article.update);

const tag = controllers.tag
router.get('/tag', tag.index)
router.post('/tag', tag.create)

module.exports = router;
