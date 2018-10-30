
启动前准备：

全局安装：pm2

npm install pm2 -g

再用pm2安装依赖模块：pm2-intercom，/----作用是实现日志输入到文件，因为log4js 2.x以后的版本，日志输入不兼容,需要引入依赖模块；

pm2 install pm2-intercom




启动方法：

在/bin目录下：

开发环境输入命令：
pm2 start pm2.json --env dev

生产环境输入命令：

pm2 start pm2.json    //默认是成产环境


