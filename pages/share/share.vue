<template>
	<view class="share">
		<view class="info">
			<view>
				<text> {{$t('share.today')}} {{shareInfo.toDayMyPushCount}} </text>
				<text> {{$t('share.week')}}  {{shareInfo.weekMyPushCount}} </text>
				<text> {{$t('share.total')}} {{shareInfo.allMyPushCount}} </text>
			</view>
			<view>
				<text> {{$t('share.yesterday')}} {{shareInfo.yesterDayMyPushCount}}人</text>
				<text> {{$t('share.month')}} {{shareInfo.monthMyPushCount}}人</text>
			</view>
		</view>
		<view class="link">
			{{$t('share.linkdes')}}
			<view class="detail">
				<text>sdfasdfasdf23</text>
				<view  > {{$t('share.linkcopy')}} </view>
			</view>
		</view>
		<view class="push">
			<view class="title">Commission bonus amount rules<image style="width: 25rpx;height: 25rpx;" src="../../static/image/vip.png">
				</image>
			</view>
			<view>Recommend friends to join BBG to earn money, earn more than 80% commission rewards</view>
			<view class="user">
				<image style="width: 120rpx;height: 120rpx;" src="../../static/share/share-user.png"></image>
				<view style="display: flex;flex-direction: column;">
					<text>Recommended quantity > 100</text>
					<text>Commission > 5,000 reais a month！</text>
				</view>
			</view>

			<view style="width: 100%;text-align: center;margin: 24rpx 0;">Unlimited recommended development</view>
			<image style="width: 700rpx;height: 450rpx;" src="../../static/share/share-link.png"></image>
			<view style="font-size: 28rpx;">1.Every time you recommend a player to bet，<text>Win or lose</text>When, you will receive a different commission percentage.。</view>
			<view style="font-size: 28rpx;">2.The system calculates the commission every 24 hours</view>
		</view>

	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				shareInfo:{}
			}
		},
		onShow() {
			this.getExpand()
		},
		mounted() {
			
		},
		methods: {
			//  推广数据接口
			getExpand() {
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id,
				}
				var that = this
				request.tokenRequest({
					url: '/api/v1/main/myGetPushInfo',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							that.shareInfo = res.data.data	
						}
						/**
						 * "data": {
        "groupTotal": 0,            //团队总人数
        "yesterDayMyPushCount": 0,  //昨日推广数
        "weekMyPushCount": 1,       //本周推广数
        "monthMyPushCount": 1,      //本月推广数
        "rateLv4": "2",             //等级4佣金费率
        "rateLv5": "2.5",           //等级5佣金费率
        "rateLv2": "1",             //等级2佣金费率
        "rateLv3": "1.5",           //等级3佣金费率
        "rateLv1": "0.5",           //等级1佣金费率
        "toDayMyPushCount": 1,      //今日推广数
        "allMyPushCount": 1         //总推广数量
    }
						 */
					}
				})
			},    
		},
	}	
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.share {}

	.info>view {
		width: 50%;
		display: flex;
		flex-direction: column;
	}

	.info text {}

	.info {
		background: white;
		margin: 24rpx;
		display: flex;
		padding: 24rpx;
		border-radius: 24rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.link {
		background: white;
		padding: 12rpx 24rpx;
		font-size: 32rpx;
	}

	.link .detail {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		margin-top: 18rpx;
		padding: 12rpx;
		border-radius: 12rpx;
		background: #f5f5f5;
		justify-content: space-between;
	}

	.push {
		margin-top: 24rpx;
		padding: 24rpx;
		background: white;
		border-radius: 24rpx 24rpx 0 0;
		font-size: 32rpx;
	}

	.push text {
		color: red;
	}

	.push .title {
		padding-bottom: 12rpx;
		border-bottom: 1rpx #eee solid;
	}

	.push .user {
		display: flex;
		align-items: center;
		margin-top: 24rpx;
	}
</style>