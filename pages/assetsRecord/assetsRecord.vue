<template>
	<view class="asset-list-page">
		<view class="list-header">
			<text style="width: 200rpx;"> {{$t('assets.type')}} </text>
			<text style="width: 300rpx;"> {{$t('assets.amount')}}</text>
			<text style="width: 250rpx;"> {{$t('assets.time')}} </text>
		</view>

		<view class="asset-list">
			<view class="asset-item" v-for="(item, index) in assetItems" :key="index">
				<text style="width: 200rpx;">{{ item.bizCode }}</text>
				<text style="width: 300rpx;">{{ item.amount }}</text>
				<text style="width: 250rpx;">{{ item.createTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				assetItems: [{
						type: '存款',
						amount: 1000,
						time: '11-01 10:00'
					},
					{
						type: '取款',
						amount: -500,
						time: '11-02 11:00'
					},
					{
						type: '收入',
						amount: 200,
						time: '11-03 12:00'
					},
					
					// 可以添加更多资产列表项
				],
				pageNo:1
			};
		},
		mounted() {
			this.getRecord();
		},
		onReachBottom(){
			this.pageNo = this.pageNo + 1 ;
			this.getRecord();
		},
		methods:  {
			getRecord() {
				var that = this
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id,
					page: that.pageNo
				}
				request.tokenRequest({
					url: '/api/v1/main/myGetBalanceRecord',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							if(that.pageNo == 1){
								that.assetItems = res.data.data.content
								const local = uni.getLocale()
								if (local == 'en') {
									that.assetItems.forEach(item => {
									    if (item.bizCode === '发包扣除') {
									        item.bizCode = 'Send';
									    }
										if (item.bizCode === '抢包增加') {
										    item.bizCode = 'Grap';
										}
										if (item.bizCode === '充值增加') {
										    item.bizCode = 'Recharge';
										}
										if (item.bizCode === '提现扣除') {
										    item.bizCode = 'Withdraw';
										}
										if (item.bizCode === '1级代理返现') {
										    item.bizCode = 'Lv1 reward';
										}
										if (item.bizCode === '2级代理返现') {
										    item.bizCode = 'Lv2 reward';
										}
										if (item.bizCode === '3级代理返现') {
										    item.bizCode = 'Lv3 reward';
										}
										if (item.bizCode === '4级代理返现') {
										    item.bizCode = 'Lv4 reward';
										}
										if (item.bizCode === '5级代理返现') {
										    item.bizCode = 'Lv5 reward';
										}
									});
								}				
								
								
							}else{
								var list = that.assetItems  
								that.assetItems = list.push(...res.data.data.content) ;
							}
						}
					}
				})
			}
		}
	};
</script>

<style scoped>
	page {
		background: #f5f5f5;
	}

	/* 样式可根据实际需求进行调整 */
	.asset-list-page {
		padding: 0px;
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 27rpx;
		background-color: white;
		font-weight: bold;
	}

	.asset-item {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 23rpx;
		margin: 12rpx;
		background: white;
		border-radius: 12rpx;
		border-bottom: 1px solid #eee;
	}
</style>