## 记录一些自己写(抄别人)的前端组件

所有组件都在src/components目录下，目前有两个(更新中)

App.tsx文件是对组件的测试

### Modal弹窗
- 弹窗基本逻辑
- 处理滚动穿透
- 入动画：scale:0.5->1 opacity:0->1
- 出动画：opacity:1->0
### useRemoteData
- 基于react-use中的useAsync实现的一个异步请求函数
- 首次加载
- 手动刷新再次加载
- 保留新老数据
 
