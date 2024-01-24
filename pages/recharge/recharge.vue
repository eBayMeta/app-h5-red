<template>
	<view class="usdt-recharge-page">
		<view style="display: flex;align-items: center;">
			<image class="qr-code" :src="generateQRCode(selectedAddress)" mode="aspectFit" />
		</view>
		
		<view>
			<view class="box">
				<!-- <view class="network-selection">
					<text>  {{$t('recharge.network')}} </text>
					<view class="li" @change="bindPickerChange">
						<picker :range="networkTypes" :value="selectedIndex" >
							<view style="padding: 0 24rpx;">{{networkTypes[selectedIndex]}}</view>
						</picker>
						<image style="width: 25rpx;height: 25rpx;" src="../../static/image/ptz-down.png"></image>
					</view>
				</view> -->

				<view class="recharge-address">
					<text> {{$t('recharge.address')}} </text>
					<view class="li">
						<text class="address-text">{{ selectedAddress }}</text>
						<image style="width: 45rpx;height: 45rpx;" src="../../static/image/cope.png" @click="copyAddress"> </image>
					</view>
				</view>

			</view>

			<view class="li">
				<label> {{$t('recharge.to')}} </label>
				<view> {{$t('recharge.toView')}}
				 <!-- <image style="width: 25rpx;height: 25rpx;" src="../../static/image/ptz-down.png"></image> -->
				</view>
			</view>
			
			<view class="li">
				<label> {{$t('recharge.min')}} </label>
				<view> >=10 USDT </view>
			</view>
		 
			<view class="li">
				<label> {{$t('recharge.des')}}</label>
				<view></view>
			</view>
			
			<view class="hint"> 
				{{$t('recharge.desView')}}
				
			</view>
			 
			<view style="position: fixed;bottom: 800rpx;display: flex;align-content: center;width: 700rpx;">
				 <!-- <view class="buttom-btn" @click="saveQRCodeImage">Save</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				selectedNetwork: 'ETH', // 默认选择的转账主网
				selectedIndex: 0,
				networkTypes: ['ETH', 'TRON' ],
				addresses: {
					ETH: '0x1234567890abcdef', // 模拟ETH网络的地址
					TRON: 'TTrb2zS7VFMuoXhexxN5rUp4NjH5dZTVxX', // 模拟TRON网络的地址
					// 可根据需要添加其他主网类型的地址
				},
				address:'',
			};
		},
		computed: {
			selectedAddress() {
				return  this.address//this.addresses[this.selectedNetwork];
			}
		},
		onShow() {
			this.getAddress()
		},
		methods: {
			generateQRCode(address) {
				// 这里可以使用生成二维码的库，根据实际使用的库进行调用生成对应地址的二维码
				// 返回生成的二维码图片地址
				return `https://api.qrserver.com/v1/create-qr-code/?data=${address}&size=200x200`;
			},
			copyAddress() {
				// 调用剪贴板API复制地址到剪贴板
				uni.setClipboardData({
					data: this.selectedAddress,
					success() {
						uni.showToast({
							title: 'Address copied',
							icon: 'none'
						});
					},
					fail() {
						uni.showToast({
							title: 'Replication failure',
							icon: 'none'
						});
					}
				});
				
			},
			getAddress(){
				var that = this
				uni.showLoading({
					title:'Refreshing'
				})
				var userInfo = uni.getStorageSync('userInfo')
				var data ={
					uid:userInfo.id
				}
				request.tokenRequest({
					url: '/api/v1/main/getMyRechargeAddr',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							that.address = res.data.data
						}
					}
				})
			},
			
			//不支持h5
			saveQRCodeImage() {
			            const that = this;
			            const imagePath = this.generateQRCode(this.selectedAddress);
			
			            uni.saveImageToPhotosAlbum({
			                filePath: imagePath,
			                success() {
			                    uni.showToast({
			                        title: 'Image saved to gallery',
			                        icon: 'success'
			                    });
			                },
			                fail() {
			                    uni.showToast({
			                        title: 'Failed to save image',
			                        icon: 'none'
			                    });
			                }
			            });
			        }
			
		}
	};
</script>

<style scoped>
	/* 样式可根据实际需求进行调整 */
	.usdt-recharge-page {
		padding: 20px;
	}

	.network-selection {
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}

	.recharge-address {
		display: flex;
		flex-direction: column;
		padding-top: 20rpx;
		font-size: 32rpx;
		border-top: 1rpx #eee solid;
	}

	.address-text {
		flex: 1;
		margin-right: 10px;
	}

	button {
		padding: 8px 16px;
		border-radius: 5px;
		font-size: 24rpx;

	}

	.qr-code {
		width: 100px;
		height: 100px;
		margin: 0 auto;
	}
	.box{
		border: 1rpx #eee solid;
		padding: 24rpx;
		border-radius: 24rpx;
	}
	.hint{
		font-size: 24rpx;
		color: #999;
		margin-top: 32rpx;
	}
	.more{
		font-size: 32rpx;
		width: 700rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
		display: flex;
	}
	.li {
		display: flex;
		margin-top: 12rpx;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}
	.li label{
		color: #999;
	}
	.buttom-btn{
		background: #e6c946;
		color: #333;
		border-radius: 24rpx;
		width: 350rpx;
		padding: 20rpx;
		text-align: center;
		margin:  0 auto;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
	}
</style>