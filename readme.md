git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:zhanglizhen0/miniprogram-clip-image.git
git push -u origin master

git pull --rebase origin master   
//这条指令的意思是把远程库中的更新合并到本地库中，–rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。

# 事件
  1 参数问题   通过data-  获取
    ~ 小程序是react模式的，使用data触发状态变化而刷新界面
  2 target  currentTarget

# 路由传参
  下一个跳转路由中的 onLoad(e)  e 获取参数

# 公共变量
  App 内定义 
  getApp().data  
  
# template 
  定义 name
  使用 is
  父->子 传参  data
  回调 
    引入子对象，调用子事件
# component 
  组件内： Component()构造器 ， 参数properity , methods
  父： this.selectComponent(id)  // 可调用组件内部的参数，方法
  

# {{}}  内不能使用函数

# 小程序不允许打开超过5个层级的页面 ,   
