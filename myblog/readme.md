项目来源：https://github.com/nswbmw/N-blog

对应文件及文件夹的用处：

    models: 存放操作数据库的文件
    public: 存放静态文件文件，如样式、图片等
    routes: 存放路由文件
    views: 存放模板文件
    index.js: 程序主文件
    package.json: 存储项目名、描述、作者、依赖等等信息

安装依赖项
npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save

对应模块的用处：
    1. express: web 框架
    2. express-session: session 中间件
            我们通过引入 express-session 中间件实现对会话的支持：
            app.use(session(options))
            session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。
    3. connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
    4. connect-flash: 页面通知提示的中间件，基于 session 实现
            connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段。
    5. ejs: 模板
    6. express-formidable: 接收表单及文件的上传中间件
    7. config-lite: 读取配置文件
    8. marked: markdown 解析
    9. moment: 时间格式化
    10. mongolass: mongodb 驱动
        我们使用 Mongolass 这个模块操作 mongodb 进行增删改查。在 myblog 下新建 lib 目录，在该目录下新建 mongo.js，
    11. objectid-to-timestamp: 根据 ObjectId 生成时间戳
    12. sha1: sha1 加密，用于密码加密
    13. winston: 日志
    14. express-winston: 基于 winston 的用于 express 的日志中间件

模块详解
不管是小项目还是大项目，将配置与代码分离是一个非常好的做法。我们通常将配置写到一个配置文件里，如 config.js 或 config.json ，并放到项目的根目录下。但通常我们都会有许多环境，如本地开发环境、测试环境和线上环境等，不同的环境的配置不同，我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的。

config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 NODE_ENV=test node app 启动，则通过 require('config-lite') 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则通过 require('config-lite') 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。

4.4.1 功能与路由设计

功能及路由设计如下：

    注册
        注册页：GET /signup
        注册（包含上传头像）：POST /signup
    登录
        登录页：GET /signin
        登录：POST /signin
    登出：GET /signout
    查看文章
        主页：GET /posts
        个人主页：GET /posts?author=xxx
        查看一篇文章（包含留言）：GET /posts/:postId
    发表文章
        发表文章页：GET /posts/create
        发表文章：POST /posts
    修改文章
        修改文章页：GET /posts/:postId/edit
        修改文章：POST /posts/:postId/edit
    删除文章：GET /posts/:postId/remove
    留言
        创建留言：POST /posts/:postId/comment
        删除留言：GET /posts/:postId/comment/:commentId/remove

由于我们博客页面是后端渲染的，所以只通过简单的 <a>(GET) 和 <form>(POST) 与后端进行交互，如果使用 jQuery 或者其他前端框架（如 angular、vue、react 等等）可通过 Ajax 与后端交互，则 api 的设计应尽量遵循 restful 风格。


