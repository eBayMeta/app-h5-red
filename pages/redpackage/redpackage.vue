<template>
	<view class="red-envelope-page">
		<view class="tab-bar">
			<text class="tab-item" :class="{ active: activeTab === 'sendRecords' }" @click="changeTab('sendRecords')">
				 {{$t('red.send')}} 
			</text>
			<text class="tab-item" :class="{ active: activeTab === 'grabRecords' }" @click="changeTab('grabRecords')">
				 {{$t('red.grap')}} 
			</text>
		</view>

		<view class="record-item">
			<view style="width: 200rpx;"> {{$t('red.code')}} </view>
			<view style="width: 200rpx;"> {{$t('red.amount')}} </view>
			<view style="width: 200rpx;"> {{$t('red.time')}} </view>
		</view>
		<view class="records-list">
			<view v-if="activeTab === 'sendRecords'" class="record-item-content" v-for="(record, index) in sendRecords"
				:key="index">
				<text style="width: 200rpx;">{{ record.packetCode }}</text>
				<text style="width: 200rpx;">{{ record.amount}}</text>
				<text style="width: 200rpx;">{{ record.createTime }}</text>
			</view>

			<view v-else-if="activeTab === 'grabRecords'" class="record-item-content" v-for="(record, index) in grabRecords" :key="index">
				<text style="width: 200rpx;">{{ record.packetCode }}</text>
				<text style="width: 200rpx;">{{ record.getterAmount }}</text>
				<text style="width: 200rpx;">{{ record.createTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				activeTab: 'sendRecords', // 默认选中的选项卡
				sendRecords: [{
						groupType: '群组A',
						amount: 10,
						time: '11-01 10:00'
					},
					{
						groupType: '群组B',
						amount: 20,
						time: '11-02 11:00'
					},
					// 可以添加更多发包记录
				],
				grabRecords: [{
						groupType: '群组A',
						amount: 5,
						time: '11-01 10:05'
					},
					{
						groupType: '群组B',
						amount: 15,
						time: '11-02 11:05'
					},
					// 可以添加更多抢包记录
				],
				pageNo: 1,
			};
		},
		onShow: () => {
			
			// this.getRedSendRecord()
		},
		onReachBottom(){
			this.pageNo = this.pageNo + 1 
			if(this.activeTab == 'grabRecords'){
				this.getRedRecord()
			}else{
				this.getRedSendRecord()
			}
		},
		mounted() {
		this.changeTab('sendRecords')	
		},
		methods: {
			changeTab(tab) {
				this.activeTab = tab;
				this.pageNo = 1
				if(this.activeTab == 'grabRecords'){
					this.getRedRecord()
				}else{
					this.getRedSendRecord()
				}
			},
			getRedRecord() {
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id,
					page: this.pageNo
				}
				var that = this
				request.tokenRequest({
					url: '/api/v1/main/myGetRedRecord',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							var list = that.grabRecords
							if (that.pageNo == 1) {
								that.grabRecords = res.data.data.content
							} else {
								that.grabRecords = list.push(...res.data.data.content)
							}
							/**
							 * {
                "id": 5,
                "packetCode": "1CXR",
                "packetImage": "http://198.252.103.34:2522/avatar/avatar-20231222040301124.png",
                "senderId": 4,
                "nextSenderId": 0,
                "groupId": 1,
                "canReceiveCount": 5,
                "nowReceiveCount": 0,
                "amount": 10,
                "remain": 10,
                "status": "等待领取",
                "createTime": "2024-01-11 05:27:34",
                "updateTime": "2024-01-11 05:27:34"
            }
							 */
							// that.userInfo = res.data.data
							// uni.setStorageSync('userInfo',res.data.data)
							// setTimeout(function() {
							// 	uni.showToast({
							// 		title:'更新成功'
							// 	})
							// }, 1000);
						}
					}
				})
			},
			
			//获取发包
			getRedSendRecord() {
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id,
					page: this.pageNo
				}
				var that = this
				request.tokenRequest({
					url: '/api/v1/main/mySendRedRecord',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							var list = that.sendRecords
							if (that.pageNo == 1) {
								that.sendRecords = res.data.data.content
							} else {
								that.sendRecords = list.push(...res.data.data.content)

							} // that.userInfo = res.data.data
							// uni.setStorageSync('userInfo',res.data.data)
							// setTimeout(function() {
							// 	uni.showToast({
							// 		title:'更新成功'
							// 	})
							// }, 1000);
						}
					}
				})
			},

		}
	};
</script>

<style scoped>
	page {
		background: #f5f5f5;
	}

	/* 样式可根据实际需求进行调整 */
	.red-envelope-page {}

	.tab-bar {
		display: flex;
		background: white;
		font-size: 32rpx;
		justify-content: space-around;
	}

	.tab-item {
		padding: 10px;
		cursor: pointer;
		font-weight: bold;	
	}

	.active {
		color: #007bff;
		border-bottom: 2px solid #007bff;
	}

	.records-list {
		margin-top: 0px;
	}

	.record-item {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 27rpx;
		margin-top: 5rpx;
		background: white;
		border-bottom: 1rpx solid #eee;
		border-top: 1rpx solid #eee;
		font-weight: bold;
	}

	.record-item-content {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 23rpx;
		border-radius: 24rpx;
		background: white;
		margin: 12rpx 24rpx;
	}
</style>