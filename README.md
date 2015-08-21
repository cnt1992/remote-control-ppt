# remote-control-ppt
基于socket.io实现移动设备远程控制ppt

## 说明

该项目基于node的socket.io技术，ppt采用了`reveal`框架。

## 如何使用
1.将该项目下载到本地，然后执行`npm install`安装依赖包；

2.启动服务器`node server`，打开浏览器输入`http://localhost:18080`

3.打开示例ppt`http://localhost:18080/es6`，此时可以看到上面打开的服务器多了一个列表，点击列表项目即可进入到控制器


## 目录结构说明
<pre>
  config
    index.js //ppt配置文件，增加了ppt在这里新增即可
  public //一些公共的资源文件
  routes
    index.js //核心路由文件
  views //ppt以及控制器文件，采用ejs模版引擎
  server.js //项目入口文件
</pre>
  
