<template>
	<view class="usdt-withdraw-page">
		<view class="withdraw-input">
			<text>Withdrawal address：</text>
			<view class="li">
				<input v-model="withdrawAddress" type="text" placeholder="Long press and stick" />
				<image style="width: 50rpx;height: 50rpx;" src="../../static/image/scan.png" @click="scanAddress">
				</image>
			</view>

		</view>

		<view class="network-selection">
			<text>Transfer main network：</text>
			<view class="li">
				<picker :range="networkTypes" :value="selectedIndex" @change="bindPickerChange">
					<view style="padding: 0 24rpx;">{{networkTypes[selectedIndex]}}</view>
				</picker>
				<image style="width: 25rpx;height: 25rpx;" src="../../static/image/ptz-down.png"></image>
			</view>

		</view>

		<view class="withdraw-amount">
			<text>Withdrawal quantity：</text>
			<view class="li">
				<input v-model="withdrawAmount" type="number" placeholder="最少0" /> USDT
				<text style="line-height: 32rpx;padding-left: 12rpx;;font-size: 28rpx;color: #eca816;"
					@click="withdrawAll">Full withdrawal</text>
			</view>

		</view>
		<view class="li" style="background: white;justify-content: space-between;">
			<label>Usable</label>
			<view>{{userInfo.balance}}</view>
		</view>
		<view class="hint">* Do not withdraw directly to the crowdfunding or ICO address, otherwise you will not receive the tokens issued by the crowdfunding or ICO</view>

		<view class="buttom-info">
			<view class="info">
				<label>Quantity received</label>
				<view><text>0.0</text>USDT</view>
				<view class="handle">
					<view class="under">Internet commission</view>0.0 USDT
				</view>
			</view>
			<button class="withdraw-btn" @click="confirmWithdraw" disabled="!withdrawEnable">Withdraw</button>
		</view>
	</view>
</template>

<script>
	
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				withdrawAddress: '', // 提现地址
				selectedNetwork: 'ETH', // 默认选择的转账主网
				selectedIndex: 0,
				networkTypes: ['ETH', 'TRON' //可根据需要添加其他主网类型
				],
				withdrawAmount: '', // 提现数量
				withdrawEnable: false,
				userInfo: {},

			};
		},
		onLaunch() {
			var userInfo = uni.getStorageSync('userInfo')
			this.userInfo = userInfo
		},
		methods: {
			bindPickerChange(e) {
				this.selectedIndex = e.detail.value
			},
			scanAddress() {
				// 调用扫码功能获取提现地址
				uni.scanCode({
					success: res => {
						this.withdrawAddress = res.result;
					},
					fail: () => {
						uni.showToast({
							title: 'Code scanning failure',
							icon: 'none'
						});
					}
				});
			},
			withdrawAll() {
				// 在此处获取用户账户的总余额，然后将总余额设置为提现数量
				const totalBalance = this.userInfo.balance; // 这里模拟用户账户的总余额
				this.withdrawAmount = totalBalance.toString();
			},
			confirmWithdraw() {
				// 处理确认提现的逻辑
				console.log('确认提现');
				console.log('提现地址:', this.withdrawAddress);
				console.log('转账主网:', this.selectedNetwork);
				console.log('提现数量:', this.withdrawAmount);
				var that = this;
				// 在这里进行提现操作，调用接口或其他操作
				if(this.withdrawAddress == undefined ||this.this.withdrawAddress ==""){
					uni.showToast({
						title:'Please enter your withdrawal address'
					})
					return
				}
				if(this.withdrawAmount == undefined || this.withdrawAmount ==''){
					uni.showToast({
						title:'Please enter quantity'
					})
					return
				}
				var amount = parseFloat(this.withdrawAmount)
				if(amount == NaN ||amount<=0 || amount > that.userInfo.balance){
					uni.showToast({
						title:'Please enter the correct quantity'
					})
					return
				}
				var data = {
					uid:'',
					toAddr:this.withdrawAddress,
					outAmount:amount
				}
				uni.showModal({
					title:'Withdraw',
					content:'Withdrawal '+amount +'udst to address' + this.withdrawAddress,
					success: (res) => {
						if(res.confirm){
							that.withdrawOnNet(data)
						}
					}
				})
				
				
			},
			withdrawOnNet(data){
				var that = this
				request.tokenRequest({
					url: '/api/v1/main/withdrawalOrder',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							uni.showToast({
								title:"Successful operation"
							})
							that.getUserInfo()
						}
					}
				})
			},
			//获取用户详情
			getUserInfo(){
				var userInfo = uni.getStorageSync('userInfo')
				var data = {
					uid :userInfo.id
				}
				request.tokenRequest({
					url: '/api/v1/main/getUserInfo',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							that.userInfo = res.data.data
							uni.setStorageSync('userInfo',res.data.data)
							setTimeout(function() {
								uni.showToast({
									title:'Successful operation'
								})
							}, 1000);
						}
					}
				})
			}
		}
	};
</script>

<style scoped>
	/* 样式可根据实际需求进行调整 */
	.usdt-withdraw-page {
		padding: 20px;
	}

	.withdraw-input,
	.network-selection,
	.withdraw-amount {
		display: flex;
		flex-direction: column;
		font-size: 32rpx;
		margin-bottom: 24rpx;
	}

	.li {
		display: flex;
		align-items: center;
		height: 68rpx;
		font-size: 28rpx;
		border-radius: 12rpx;
		margin-top: 15rpx;
		background: #f5f5f5;
	}

	.li input {
		width: 600rpx;

		font-size: 28rpx;
	}

	.li picker {
		width: 600rpx;
	}

	input {
		flex: 1;
		padding: 8px;
		margin-right: 10px;
	}

	button {
		padding: 8px 16px;
		border-radius: 5px;
	}

	.hint {
		color: #999;
		font-size: 24rpx;
		border-top: 1rpx #eee solid;
		padding-top: 48rpx;
	}

	.buttom-info {
		position: fixed;
		bottom: 0rpx;
		width: 660rpx;
		padding: 24rpx 0;
		display: flex;
		border-top: 1rpx #eee solid;
		justify-content: space-between;
	}

	.buttom-info .info {
		display: flex;
		flex-direction: column;
		font-size: 32rpx;
		width: 400rpx;
	}

	.info label {
		font-size: 28rpx;
		color: #999;
	}

	.info text {
		font-size: 36rpx;
		font-weight: bold;
		margin-right: 24rpx;
	}

	.info .handle {
		display: flex;
		align-items: center;
		text-align: center;
	}

	.info .handle .under {
		margin-right: 12rpx;
		text-decoration: underline dotted;
	}

	.withdraw-btn {
		width: 200rpx;
		height: 68rpx;
		line-height: 68rpx;
		padding: 0rpx 32rpx;
		margin-top: 48rpx;
		margin-left: 48rpx;
		background-color: #ffd913;
		color: #333;
		border: none;
		font-size: 32rpx;
		border-radius: 12rpx;
	}
</style>