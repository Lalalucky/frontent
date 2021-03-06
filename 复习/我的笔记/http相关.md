## Http
+ ### 前端优化几个方面
> 减少http请求
> 压缩和合并js以及css、雪碧图
> 图片懒加载
> 尽可能减少页面的回流和重绘
> css放头部、js放在尾部  
  

#### 为什么要减少http请求？
> http请求建立和释放是需要时间的
> 每一个http请求都需要建立一个TCP的连接和关闭。http1.0每一个连接都需要经历TCP三次握手、请求、响应、TCP的四次挥手，到http1.1的keep-alive长连接
> 浏览器对于同一个域名的并发数量有限
> + 三次握手
>   + 第一次握手：客户端什么都不能确定，服务端确认对方发送正常;
>   + 第二次握手：客户端 发送/确认 ,对方接收正常。服务端确认自己发送正常;
>   + 第三次握手：客户端确认彼此发送/接收正常。服务端确认批次发送接收正常;
> + 四次挥手
>   确认客户端不再发送请求

#### 压缩和合并js以及css、雪碧图
> 首先明确一点，如果资源太碎片化，会导致多次请求，每个请求只有几k，非常损耗性能；
> + 对于js和css，将一些高频使用的组件合并成为一个通用包，一开始就就行缓存；
> + 图片资源，小图标雪碧图，小图片转为base64，大的图片用dns进行解决 

#### 图片懒加载
> 如企业官网首页，首先只加载用户能够看到的可视区域，其他的部分在用户往下滚动的时候进行加载，提高用户体验

#### 防止回流重绘
> 回流： DOM的尺寸、结构发生局部或者全部变化时，重新渲染、绘制文档的操作；
> 重绘： 页面样式不影响在文档中的位置(background-color、color)等

#### 页面加载相关
> 页面渲染的步骤：
> 浏览器上面输入url后回车 -> 浏览器检查当前url是否有缓存 -> DNS解析域名 -> 建立TCP连接 -> 浏览器发出取出文件命令 -> 服务器响应 -> 释放TCP四次挥手 ->  服务器重定向响应[可选] -> 浏览器引擎解析html -> 浏览器渲染引擎工作[白屏时间]-> 开始显示内容[首屏时间] -> 首屏加载[首屏时间] ->  用户可以开始交互 -> 加载完成[load] ;
> 浏览器在解析 html 的时候，会自上而下的加载，并在加载过程中进行解析和渲染。在解析的过程中，在遇到外部资源时，如图片、链接的css、iconfont 等，请求的过程是异步的，并不会影响html文档的加载 ;
> 解析的过程中，浏览器先解析html文件构建DOM树，然后解析css文件构建渲染树，等到渲染树构建完成之后，浏览器开始布局渲染树并将其绘制到屏幕上;
> 当文档加载过程中遇到JS文件，html文档会被挂起渲染[加载解析渲染同步]的线程，不仅要等文档中的就是问价加载完毕，还要等待其解析完毕，才可以恢复html稳当的渲染线程。所以我们js文件都是要放在html文档末尾的。
