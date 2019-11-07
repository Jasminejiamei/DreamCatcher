<<<<<<< HEAD
10.26
=======
# 10月26日更改日记
>>>>>>> 1aaa97dc2835c1f8a2241fecfc7b5c01daf751e0
## 启动项目的步骤

由于npm管理工具包已安装,download本项目后，要安装no_module依赖包，以下是安装步骤
- 右键目录miniprogram，选择最后一栏“在终端中打开”，输入：npm install --prodution
- 点击上方最右边的“详情”，勾选“使用npm”模块
- 点击菜单栏的“工具”，选择“构建npm”
- 关于npm其它的资料请看文档（https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html）

## 使用的UI组件库为vant—ui

- [开发文档]（https://youzan.github.io/vant-weapp/#/intro）
- 使用方式，在app.json文件中配置usingComponents，已配置了部分，要添加和使用都要看文档

## 关于pages文件目录说明：
- 开发时不用管：addFunction、chooseLib、databaseGuide、deployFuntions、indexOld、storageConsole、userConsole文件
- 那些文件的书写的东西可以供我们开发时参考

## app.json文件各项说明
- “pages”：页面注册 ，要显示使用page里面的页面，要在这里注册 ,还要注意，第一个注册的，是小程序的入口页面，此处为index
- “windows”：关于小程序界面的全局配置
- “usingComponents”：使用到vant-ui的参数配置

## 目录：style
- 目录下的.wxss文件是全局可以用的，在里面写好的css属性，在pages页面的.wxss中加入 : @import "../../style/XXXX.wxss"即可；
- 在多个组件中重复使用的模块，可以通过统一写在style里面的方式减少代码冗余，同时方便管理
- 要注意文件命名，属性命名如：class 、id的命名要用英文，不要用拼音，用骆驼峰式命名。

# 云开发 quickstart

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 11.07日
统一好目录，准备开发


