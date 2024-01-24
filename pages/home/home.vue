<template>
	<view class="home-page">
		<view class="top">
			<image :src="logoUrl.configValue"></image>
			<text> {{$t('home.name')}} </text>
		</view>
		<!-- 广告 Banner -->
		<swiper class="banner" autoplay interval="3000" circular>
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image :src="item.logoUrl" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<!-- 系统消息通知栏 -->
		<view class="system-notice">
			<image style="width: 30rpx;height: 30rpx;" src="../../static/image/notify.png"></image>
			<view class="notice-container">
				<view class="notice-wrapper" :style="{ transform: 'translateY(' + translateY + 'px)' }">
					<view v-for="(notice, index) in noticeList" :key="index" class="notice-item">
						{{ notice.content }}
					</view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<scroll-view class="list" scroll-y>
			<view v-for="(item, index) in itemList" :key="index" class="list-item"
				:style="'background-image: url('+item.groupAvatar+')'">
				{{$t('home.groupName')}} {{ item.groupType }}
				<view class="content">
					<view></view>
					<view class="info">
						<text>{{item.groupType}} USDT</text>
						<!-- <label>{{item.updateTime}}</label> -->
						<button @click="enterClick" :data-id="item.id" :data-group-type="item.groupType"> {{$t('home.groupEnter')}} </button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				bannerList: [{
						imageUrl: 'https://img0.baidu.com/it/u=3166670386,3880075581&fm=253&fmt=auto&app=138&f=JPEG?w=549&h=500'
					},
					{
						imageUrl: 'https://img0.baidu.com/it/u=3166670386,3880075581&fm=253&fmt=auto&app=138&f=JPEG?w=549&h=500'
					},
					// Add more banner items as needed
				],
				noticeList: [
					'系统消息1',
					'系统消息2',
					'系统消息3',
					// Add more system notices as needed
				],
				translateY: 0, // 初始化偏移量
				noticeHeight: 30, // 单个通知的高度
				intervalId: null,
				itemList: [{
						title: '列表项1'
					},
					{
						title: '列表项2'
					},
					{
						title: '列表项3'
					},
					// Add more list items as needed
				],
				logoUrl: {}
			};
		},
		onShow() {
			this.getMainData()
		}, 
		mounted() {
			// 开始通知滚动
			// this.startNoticeScroll();
		},
		destroyed() {
			// 清除定时器
			clearInterval(this.intervalId);
		},
		methods: {
			startNoticeScroll() {
				// 设置定时器，每隔一段时间滚动通知
				this.intervalId = setInterval(() => {
					// 计算偏移量
					this.translateY -= this.noticeHeight;
					// 当到达最后一个通知时，回到起始位置
					if (Math.abs(this.translateY) >= this.noticeHeight * this.noticeList.length) {
						this.translateY = 0;
					}
				}, 2000); // 间隔时间可根据需要调整
			},

			getMainData() {
				var that = this
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid: userInfo.id
				}
				request.tokenRequest({
					url: '/api/v1/main/index',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							if (res.data.data.images != undefined && res.data.data.images.length > 0) {
								that.bannerList = res.data.data.images
							}
							if (res.data.data.notifies != undefined && res.data.data.notifies.length > 0) {
								that.noticeList = res.data.data.notifies
								that.startNoticeScroll();
							}
							if (res.data.data.groups != undefined && res.data.data.groups.length > 0) {
								that.itemList = res.data.data.groups
							}
							if (res.data.data.logoUrl != undefined) { //官方logo
								that.logoUrl = res.data.data.logoUrl
								uni.setStorageSync('logoUrl', res.data.data.logoUrl)
							}
							if (res.data.data.userInfo != undefined) { //用户信息
								uni.setStorageSync('userInfo', res.data.data.userInfo)
							}

						}
					}
				})
			},
			enterClick(res) {
				 var groupId = res.currentTarget.dataset.id;
				    var groupType = res.currentTarget.dataset.groupType;
				    uni.navigateTo({
				        url: '/pages/chat/chat?groupId=' + groupId + '&groupType=' + groupType
				    });
			}
		}
	};
</script>

<style scoped>
	
	/* 默认样式，适用于大屏幕设备 */
	body {
	  font-size: 16px;
	}
	
	/* 在小屏幕上应用不同的样式 */
	@media screen and (max-width: 768px) {
	  body {
	    font-size: 14px;
	  }
	}
	
	/* 在更小的屏幕上应用不同的样式 */
	@media screen and (max-width: 480px) {
	  body {
	    font-size: 12px;
	  }
	}
	
	/* 样式可根据实际需求进行调整 */
	page {
		background: #f5f5f5;
	}

	.home-page {}

	.banner {
		height: 350rpx;
	}

	.top {
		padding: 12rpx;
		background: #f34b19;
		display: flex;
		align-items: center;
	}

	.top image {
		width: 50rpx;
		height: 50rpx;
	}

	.top text {
		position: absolute;
		display: flex;
		top: 16rpx;
		align-items: center;
		left: 270rpx;
	}

	.system-notice {
		margin-top: 10rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.fixed-buttons {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
	}

	.fixed-buttons button {
		margin-bottom: 10px;
		padding: 8px 16px;
		border-radius: 5px;
	}

	.notice-container {
		height: 30px;
		/* 单个通知的高度 */
		overflow: hidden;
	}

	.notice-wrapper {
		transition: transform 0.5s ease;
		/* 可以调整动画持续时间和效果 */
	}

	.notice-item {
		height: 30px;
		/* 单个通知的高度 */
		line-height: 30px;
		/* 垂直居中 */
	}

	.list {
		margin-top: 20rpx;
		background: white;
		width: 700rpx;
		margin: 20rpx 25rpx 0 25rpx;
	}

	.list-item {
		border-radius: 12rpx;
		background-size: 750rpx 250rpx;
		background-position: center;
		background-repeat: no-repeat;
		height: 250rpx;
		color: yellow;
		padding: 12rpx;
		border-bottom: 16rpx solid white;
	}

	.content {
		display: flex;
		justify-content: space-between;

	}

	.info {
		display: flex;
		flex-direction: column;
	}

	.info text {
		font-size: 25rpx;
	}

	.info label {
		color: bisque;
		font-size: 20rpx;
		margin-top: 12rpx;
	}

	.info button {
		line-height: 50rpx;
		border-radius: 24rpx;
		margin-top: 24rpx;
		background: bisque;
	}
</style>