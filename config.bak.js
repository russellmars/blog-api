const config = {}

// app 相关
config.app_host = '127.0.0.1'
config.app_post = '2333'

// mongo 相关
config.mongo_uri = 'mongodb://localhost:27017/blog'
config.mongo_user = 'mongo_user'
config.mongo_pass = 'mongo_pass'

config.qiniu_access_key = 'qiniu_access_key'
config.qiniu_secret_key = 'qiniu_secret_key'
config.qiniu_bucket = 'qiniu_bucket'

module.exports = config
