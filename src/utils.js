export default class DelayLoading {
	constructor () {}

	/* 获取单例 */
	static getInstance () {
		if (!DelayLoading._instance) {
			DelayLoading._instance = new DelayLoading()
		}
		return DelayLoading._instance
	}

	/* 初始化 */
	initComponent (ctrlPropertyName) {
		try {
			// 只需要init一次
			if (this.ctrlPropertyName) {
				throw new Error("function 'initComponent' only needs to be run once")
			} 
			// 传参检验
			if (!ctrlPropertyName) {
				throw new Error("param of function 'initComponent' is required")
			}
			// 参数类型检验
			if (typeof ctrlPropertyName !== 'string') {
				throw new Error('the param must be string')
			}
			// 属性冲突检验
			if (!wx.hasOwnProperty('_requestCount') && !wx.hasOwnProperty(ctrlPropertyName)) {
				wx._requestCount = 0
				wx[ctrlPropertyName] = false
				this.ctrlPropertyName = ctrlPropertyName
			} else {
				throw new Error('initComponent fail')
			}
		} catch (error) {
			throw new Error(error.message || 'initComponent fail')
		}
	}

	/* 请求开始增加请求计数 */
	_addReqCount () {
		wx._requestCount = wx._requestCount || 0
		wx._requestCount++
	}

	/* 检查当页正在进行的请求数 */
	checkReqCountClear () {
		wx._requestCount--
		if (wx._requestCount <= 0) {
			const pages = getCurrentPages()
			const curPage = pages[pages.length - 1]
			const key = this.ctrlPropertyName
			curPage.setData({
				[key]: false
			})
			wx._requestCount = 0
		}
	}
	
	/* 请求开始设置页面加载动画显示时机（加载时间超过time则显示加载动画） */
	setDelayLoading (time = 500) {
		// 参数类型检验
		if (typeof time !== 'number') {
			throw new Error('the param must be number')
		}
		// 请求计数 +1
		this._addReqCount()
		// 设置延迟显示定时器
		const pages = getCurrentPages()
		const curPage = pages[pages.length - 1]
		const key = this.ctrlPropertyName
		const timer = setTimeout(() => {
			const { _requestCount } = wx
			curPage.setData({ 
				[key]: _requestCount !== 0 ? true : false 
			})
			clearTimeout(timer)
		}, time)
	}

}
