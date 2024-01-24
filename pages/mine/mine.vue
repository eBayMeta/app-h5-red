<template>
	<view style="padding-bottom: 100rpx;">
		<view class="top">
			<view class="action">
				<view> </view>
				<image @click="settingClick" src="../../static/image/setting.png"></image>
			</view>
			
		 
			<view class="avatar">
				<image :src="userInfo.avatar"></image>
				<view class="info">
					<view style="display: flex;align-items: center;"> 
						{{$t('mine.nickName')}} : {{userInfo.nickName}}
					</view>
					<view style="display: flex;align-items: center;"> 
						{{$t('mine.userLevel')}} :  <view class="tag" >Lv.1</view>
					</view>
					
					<view>
						{{$t('mine.inviteCode')}}: {{userInfo.code}}
					</view>
				</view>
			</view>
			<view class="blance">{{userInfo.balance}}
				<image @click="refreshClick" style="margin-left: 24rpx;" src="../../static/image/refresh-white.png">
				</image>
			</view>
			<view class="hint"> {{$t('mine.walletBalance')}} </view>
		</view>

<view style="height: 24rpx;"></view>
		<view class="wallet">
			<view @click="rechargeClick">
				<image src="../../static/image/recharge.png"></image> {{$t('mine.recharge')}}
			</view>
			<view @click="withdrawalClick">
				<image src="../../static/image/withdrawl.png"></image> {{$t('mine.withdrawal')}}
			</view>
		</view>

<view style="height: 24rpx;"></view>

		<view style="padding-bottom: 100rpx;background: white;font-size: 15px;">
			<view class="item" @click="itemClick" data-index="2">
				<image src="../../static/image/billing.png"></image>
				<view>
					<text> {{$t('mine.balanceHistory')}} </text>
					<label>  {{$t('mine.balanceHistoryView')}}  </label>
				</view>
			</view>
			
			 
			<view class="item" @click="itemClick" data-index="3">
				<image src="../../static/image/money-funds.png"></image>
				<view>
					<text> {{$t('mine.fundHistory')}} </text>
					<label> {{$t('mine.fundHistoryView')}} </label>
				</view>
			</view>
			
			<view class="item" @click="itemClick" data-index="4">
				<image src="../../static/image/redlogo.png"></image>
				<view>
					<text> {{$t('mine.redRecord')}} </text>
					<label> {{$t('mine.redRecordView')}} </label>
				</view>
			</view>
			 
			<view class="item" @click="settingClick" data-index="5">
				<image src="../../static/mine/safe.png"></image>
				<view>
					<text> {{$t('mine.security')}} </text>
					<label> {{$t('mine.securityView')}} </label>
				</view>
			</view>
			
			<view class="item" @click="itemClick" data-index="6">
				<image src="../../static/image/share.png"></image>
				<view>
					<text> {{$t('mine.sharing')}} </text>
					<label> {{$t('mine.sharingView')}} </label>
				</view>
			</view>
			 
			<view class="item" @click="itemClick" data-index="8">
				<image src="../../static/mine/service.png"></image>
				<view>
					<text> {{$t('mine.service')}} </text>
					<label> {{$t('mine.serviceView')}} </label>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			//设置
			settingClick() {
				uni.navigateTo({
					url: "/pages/modify/modify"
				})
			},
			//刷新
			refreshClick() {
				var data = {
					uid: '',
				}
				var that = this
				uni.showLoading({
					title: 'Refreshing'
				})
				request.tokenRequest({
					url: '/api/v1/main/getUserInfo',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							that.userInfo = res.data.data
							uni.setStorageSync('userInfo', res.data.data)
							setTimeout(function() {
								uni.showToast({
									title: 'Update successfully'
								})
							}, 1000);
						}
					}
				})
			},
			//充值
			rechargeClick() {

				uni.switchTab({
					url: "/pages/recharge/recharge"
				})
			},
			//提现
			withdrawalClick() {
				uni.navigateTo({
					url: "/pages/withdraw/withdraw"
				})
			},
			itemClick(e) {
				var index = e.currentTarget.dataset.index
				var url = ''
				switch (index) {
					case "1":
						url = ''
						break
					case '2':
						url = '/pages/assetsRecord/assetsRecord'
						break
					case "3":
						url = '/pages/commission/commission'
						uni.switchTab({
							url: url
						})
						return
						break
					case "4":
						url = '/pages/redpackage/redpackage'
						break
					case "5":
						url = ''
						break
					case "6":
						url = '/pages/share/share'
						uni.switchTab({
							url: url
						})
						return
						break
					case "7":
						url = ''
						break
					case "8":
						url = ''
						break

				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.top {
		background-image: linear-gradient(#f34b19, #fd7c26), linear-gradient(#fd908e, #fc3e16);
		display: flex;
		flex-direction: column;
		color: white;
		padding: 24rpx;
	}

	.top .action {
		display: flex;
		align-items: center;
		padding-bottom: 50rpx;
		justify-content: space-between;
	}

	.action image {
		width: 40rpx;
		height: 40rpx;
	}

	.avatar {
		display: flex;
		align-items: center;
	}

	.avatar image {
		height: 120rpx;
		width: 120rpx;
	}

	.avatar .info {
		display: flex;
		font-size: 28rpx;
		flex-direction: column;
		margin-left: 20px;
	}

	.avatar .info>view {
		line-height: 48rpx;
	}

	.info .tag {
		background: #fd7c26;
		border-radius: 25rpx;
		padding: 10;
		font-weight: 100;
		margin-left: 15px;
	}

	.top .blance {
		font-size: 48rpx;
		display: flex;
		margin-top: 12rpx;
		align-items: center;
	}

	.top .blance image {
		height: 40rpx;
		width: 40rpx;
	}

	.top .hint {}

	.wallet {
		display: flex;
		background: #f5f5f5;
		box-shadow: 3rpx #eee;
	}

	.wallet>view {
		width: 50%;
		padding: 32rpx 48rpx;
		display: flex;
		align-items: center;
	}

	.wallet image {
		height: 50rpx;
		width: 80rpx;
	}

	.item {
		float: left;
		padding: 24rpx;
		width: 300rpx;
		display: flex;
	}

	.item image {
		width: 80rpx;
		height: 80rpx;
	}

	.item label {
		color: #999;
		font-size: 24rpx;
	}

	.item>view {
		display: flex;
		flex-direction: column;
	}
</style>