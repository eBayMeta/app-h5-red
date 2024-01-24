<template>
	<view class="commission-detail-page">
		<view class="header">
			<view class="commission-info">
				<text> {{$t('fund.today')}}: {{ todayCommission }}</text>
				<text> {{$t('fund.yesterday')}}: {{ yesterdayCommission }}</text>
				<text> {{$t('fund.week')}}: {{ weekCommission }}</text>
				<text> {{$t('fund.month')}}: {{ monthCommission }}</text>
				<text> {{$t('fund.total')}}: {{ totalCommission }}</text>
			</view>
		</view>

		<view class="list-header">
			<text>{{$t('fund.level')}}</text>
			<text>{{$t('fund.number')}}</text>
			<text>{{$t('fund.redTotal')}}</text>
			<text>{{$t('fund.reward')}}</text>
		</view>

		<view class="commission-list">
			<view class="commission-item" v-for="(item, index) in commissionItems" :key="index">
				<text>{{ item.level }}</text>
				<text>{{ item.levelPsuhCount }}</text>
				<text>{{ item.levelSendTotalSum }}</text>
				<text>{{ item.levelRewardTotal }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				todayCommission: 50, // 今日佣金
				yesterdayCommission: 50, // 今日佣金
				weekCommission: 200, // 本周佣金
				monthCommission: 800, // 本月佣金
				totalCommission: 5000, // 总佣金
				commissionItems: [{
						level: 'VIP',
						numberOfPeople: 20,
						amount: 2000,
						commission: 500
					},
					{
						level: 'Gold',
						numberOfPeople: 50,
						amount: 5000,
						commission: 1000
					},
					// 可以添加更多佣金详情列表项
				]
			};
		},
		onShow() {
			this.getCommission()
		},
		mounted() {
			
		},
		methods: {
			getCommission(){
				var that = this
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id
				}
				request.tokenRequest({
					url: '/api/v1/main/myReward',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							var info = res.data.data
							var list = []
							if (info.lv1) {
								var json = {
									level: "lv1",
									levelPsuhCount: info.lv1.level1PsuhCount,
									levelSendTotalSum: info.lv1.level1SendTotal,
									levelRewardTotal: info.lv1.level1RewardTotal,
								}
								list.push(json)
							}
							if (info.lv2) {
								var json = {
									level: "lv2",
									levelPsuhCount: info.lv2.level2PsuhCount,
									levelSendTotalSum: info.lv2.level2SendTotal,
									levelRewardTotal: info.lv2.level2RewardTotal,
								}
								list.push(json)
							}
							if (info.lv3) {
								var json = {
									level: "lv3",
									levelPsuhCount: info.lv3.level3PsuhCount,
									levelSendTotalSum: info.lv3.level3SendTotal,
									levelRewardTotal: info.lv3.level3RewardTotal,
								}
								list.push(json)
							}
							if (info.lv4) {
								var json = {
									level: "lv4",
									levelPsuhCount: info.lv4.level4PsuhCount,
									levelSendTotalSum: info.lv4.level4SendTotal,
									levelRewardTotal: info.lv4.level4RewardTotal,
								}
								list.push(json)
							}
							if (info.lv5) {
								var json = {
									level: "lv5",
									levelPsuhCount: info.lv5.level5PsuhCount,
									levelSendTotalSum: info.lv5.level5SendTotal,
									levelRewardTotal: info.lv5.level5RewardTotal,
								}
								list.push(json)
							}
							that.commissionItems = list
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
	.commission-detail-page {}

	.header {
		margin-bottom: 10rpx;

	}

	.commission-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		margin: 24rpx;
		font-size: 32rpx;
		border-radius: 24rpx;
		background-color: white;
		font-weight: bold;
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 27rpx;
		background-color: #f0f0f0;
		font-weight: bold;
	}

	.commission-item {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background: white;
		font-size: 28rpx;
		box-shadow: 2rpx #eee;
		margin: 12rpx 24rpx;
		border-radius: 12rpx;
		border-bottom: 1px solid #ccc;
	}
</style>