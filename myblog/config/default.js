/**
 * Created by zj on 2016/12/1 0001.
 */
/**
 *port: 程序启动要监听的端口号
 *session: express-session 的配置信息，后面介绍
 *mongodb: mongodb 的地址，myblog 为 db 名
 * @type {{port: number, session: {secret: string, key: string, maxAge: number}, mongodb: string}}
 */
module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog'
};