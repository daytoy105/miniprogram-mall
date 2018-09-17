# git 
  git init
  git add README.md
  git commit -m "first commit"
  git remote add origin git@github.com:zhanglizhen0/miniprogram-mall.git
  git push -u origin master
  git pull --rebase origin master   
  //这条指令的意思是把远程库中的更新合并到本地库中，–rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。

# 小程序启动
  // app.js
  注册小程序 App() 
  // 子页面
  获取应用实例  getApp()
  获取全局数据 ： getApp().data  

# Page() 页面注册
  1.onLoad: 页面加载
    一个页面只会调用一次。
    接收页面参数可以获取wx.navigateTo和wx.redirectTo及中的 query。
  2.onShow: 页面显示
    每次打开页面都会调用一次。
  3.onReady: 页面初次渲染完成
    一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
    对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
  4.onHide: 页面隐藏
    当navigateTo或底部tab切换时调用。
  5.onUnload: 页面卸载
    当redirectTo或navigateBack的时候调用。

# 路由传参
  · 定义 ： app.json 文件下  pages 对象
  · 下一个跳转路由中的 onLoad(e)  e 获取参数  e.query
  · 当前路由信息   getCurrentPage() 获取路由实例
  · 路由嵌套层次不能大于5层的？ 处理 
    小程序的UI视图和逻辑处理是用多个webview实现的，逻辑处理的JS代码全部加载到一个Webview里面，称之为AppService，整个小程序只有一个，并且整个生命周期常驻内存，而所有的视图（wxml和wxss）都是单独的Webview来承载，称之为AppView。所以一个小程序打开至少就会有2个webview进程，正是因为每个视图都是一个独立的webview进程，考虑到性能消耗，小程序不允许打开超过5个层级的页面 

# 页面跳转
  navigateTo, redirectTo 只能打开非 tabBar 页面。
  switchTab 只能打开 tabBar 页面。
  reLaunch 可以打开任意页面。
  页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
  调用页面路由带的参数可以在目标页面的onLoad中获取。


# 数据
  . data:{} 数据深拷贝， this 获取
  · {{}}  内不能使用函数， wxml 数据绑定
  · setData 函数
    用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。


# 事件
  1 参数问题   通过data-  获取
    ~ 小程序是react模式的，使用data触发状态变化而刷新界面
  2 target  currentTarget
    event.target返回触发事件的元素, 目标阶段 
    event.currentTarget返回绑定事件的元素，等于this   捕获(从外->里)、 目标、 冒泡(从里->外)
    若 存在父子元素嵌套，在父元素添加点击事件，子元素触发时，currentTarget是父元素，target是子元素

# template 
  定义 name
  使用 is
  父->子 传参  data
  回调 
    // 引入子对象，调用子事件, 同时子组件中的事件要在父组件中定义
    import tempObj from '../template/index'
    tempObj.fn()

# component 
  组件内： Component()构造器 ， 参数properity , methods
  父： this.selectComponent(id)  // 可调用组件内部的参数，方法
      json 文件 配置 
      {
        "usingComponents": {
          "shop-item": "/components/shop-item/shop-item"
        }
      }

# for 循环
  