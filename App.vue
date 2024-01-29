<script>
	export default {
		//测试提交
		globalData: {
			// apiRoot: 'http://127.0.0.1:5001',
			// baseWsUrl: 'ws://127.0.0.1:5002/group/',
			// imUrl: 'http://127.0.0.1:5002',
			
			apiRoot: 'http://192.168.0.16:5001',
			baseWsUrl: 'ws://192.168.0.16:5002/group/',
			imUrl: 'http://192.168.0.16:5002',
			
			
			// apiRoot: 'http://172.20.10.2:5001',
			// baseWsUrl: 'ws://172.20.10.2:5002/group/',
			// imUrl: 'http://172.20.10.2:5002',
			
			// apiRoot: 'http://198.252.103.34:5001',
			// baseWsUrl: 'ws://198.252.103.34:5002/group/',
			// imUrl: 'http://198.252.103.34:5002',
			
			token: uni.getStorageSync('token'),
			statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
			_i18n: '',
			$t: ''
		},
		onLaunch: function() {
			console.log('App Launch')
			// this.$i18n.locale = 'en' // 这里切换预言
			// let context = this;
			// this.globalData._i18n = this.$i18n //这是原型链上的$i18n  
			// this.globalData.$t = function(str) {
			//     let $i18n = getApp().globalData.$i18n //这里去拿global的i18n  
			//     return context.$t(str)
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>