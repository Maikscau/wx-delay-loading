## 一、npm包介绍
#### 可控制延迟显示的微信小程序 loading 组件，默认请求超过0.5s才显示loading动画；支持 slot 自定义 loading 显示内容。
在项目中，若网络良好的情况下，每次请求都显示loading动画，会导致页面短时间内频繁闪现loading动画，用户体验不佳。本组件可自定义请求延时，只有当请求超过设置的时间未完成时，才显示loading动画，减少loading动画出现的次数。

## 二、使用
1.安装 `npm i wx-delay-loading`

2.组件初始化：在 app.js-onLaunch 执行组件实例初始化方法，并传入用于控制 loading 组件显示隐藏的页面 data 内变量的名称（注：参数类型为string，本例使用 isLoading）
```js
// app.js
import DelayLoading from 'wx-delay-loading/utils' 

App({
  onLaunch: function () {
    const Loading = DelayLoading.getInstance()
    Loading.initComponent('isLoading') // 注意：此处没有写错，传入的是 key，而不是 value
  }
})
```

3.在使用组件的页面或组件的 json 配置内，引入组件
```json
// page.json
"usingComponents": {
  "wx-delay-loading": "wx-delay-loading/index"
}
```

4.在页面 wxml 中使用, 注：isShow 属性传入的页面属性必须对应第1步 initComponent 传入的参数名（本例使用 isLoading）
```js
// page.wxml 

// 不使用 slot
<delay-loading isShow="{{isLoading}}" />

// 使用 slot 自定义内容
<delay-loading customLoading="{{true}}" isShow="{{isLoading}}">
  <view class="container">
    <image class="logo" src="/static/image/logo.png" mode="widthFix" />
    <view class="text">加载中...</view>
  </view>
</delay-loading>
```

5.发起请求时，例如 wx.request() ，调用实例方法 setDelayLoading(delaytime) delaytime 默认为500，即0.5s；请求结束时，调用实例方法 checkReqCountClear()
```js
// page.js
import DelayLoading from 'wx-delay-loading/utils'
const Loading = DelayLoading.getInstance()

data: {
  isLoading: false
},

methods: {
  request () {
    // 请求开始
    Loading.setDelayLoading(300) // 请求超过0.3秒没完成，显示 loading 组件
    wx.request({
      url: 'https://example.com/getData',
      complete () {
        // 请求完成
        Loading.checkReqCountClear()
      }
    })
  }
}

```

## 三、调试——模拟低网速情况
通常在网络环境良好的情况下，请求都会很快完成，不会超过0.5s。可以通过微信开发者工具-调试器-Network，把网络设置 Online，更改为 Slow 3G，或者使用 Custom 自定义网络速度。

## 四、文档
### 1、组件 options
| 参数 | 说明 | 类型 | 默认值 |
| :-------- | :--------| :------: | :--
| customLoading  | 是否使用 slot 插槽自定义 loading 内容 |  boolean   | false |
| isShow  | 是否显示 loading |  boolean   | false |

### 2、实例 methods
| 方法名 | 说明 | 参数 | 参数类型 | 返回值 |
| :-------- | :--------| :------: | :------: |:--
| getInstance  | 调用其它方法前，获取唯一实例 |  -  | - | 实例 object |
| initComponent  | 全局安装组件，挂载必要属性 |  页面 data 内传入组件属性 isShow 的变量的名称（告知组件，你使用 data 哪个属性控制组件显示隐藏，必须与传入组件的 isShow 的属性对应）   | string | - |
| setDelayLoading  | 标记请求开始并设置延迟显示的时间 |  延迟的时间，单位毫秒   | number | - |
| checkReqCountClear  | 检测正在进行的请求数，若清零则隐藏 loading 组件 |  -   | - | - |
