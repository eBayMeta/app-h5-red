const app = getApp();
const appData = app.globalData;
var apiroot = appData.apiRoot

var $w = {
	request: function(opts) {
		var m = opts.method || 'post';
		var url = apiroot + opts.url;
		var dataType = opts.dataType || 'json';
		uni.request({
			url: url,
			method: m,
			dataType: dataType,
			data: opts.data,
			success: function(ret) {
				wx.hideLoading();
				opts.ok(ret);
			}
		})
	},
	tokenRequest: function(opts) {
		var self = this;
		var m = opts.method || 'post';
		var url = apiroot + opts.url;
		//如何传入的有http，那url 直接等于opts.url
		if(opts.url.indexOf('http') !== -1){
			url = opts.url
		}
		// if (opts.data != undefined) {
		// 	opts.data._mode = "xcx_dls2";
		// }
		var token = uni.getStorageSync('token');
		var header = uni.getStorageSync('header')
		var dataType = opts.dataType || 'json';
		uni.request({
			url: url,
			method: m,
			dataType: dataType,
			header: {
				Authorization:token
			},
			data: opts.data,
			success: function(ret) {
				if (opts.type == undefined) {
					wx.hideLoading();
				}
				if (ret.data.code == -1) {
					
				} else {
					opts.ok(ret);
				}
			},
			fail(err) {
				wx.hideLoading();
				opts.err(err);
			}
		})
	},
}
module.exports.request = $w.request;
module.exports.tokenRequest = $w.tokenRequest;