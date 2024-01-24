<template>
	<view class="login-page">
		 <view class="header">
		    
		      <uni-popup v-model="langPopupVisible" position="bottom" :style="{ height: '300rpx' }">
		        <view class="lang-popup">
		          <picker v-model="selectedLanguage" mode="selector" :range="languageOptions" @change="onLanguageChange">
		           <image class="lang-icon" src="../../static/image/lang.jpeg" ></image>
				  <view class="picker">
		              {{ languageOptions[selectedLanguage] }}
		            </view>
		          </picker>
		          <view v-show="langPopupVisible">
		            <button class="lang-btn" @click="cancelLangSelection">Cancel</button>
		            <button class="lang-btn" @click="confirmLangSelection">Confirm</button>
		          </view>
		        </view>
		      </uni-popup>
		</view>
		 
		
		<image style="width: 200rpx;height: 200rpx;margin-top: 50rpx;" src="../../static/image/system.png"></image>
		
		<div class="login" v-if="!showRegister">
			<h3 style="padding-bottom: 48rpx; text-align: center;">{{$t('login.welcome-login')}}</h3>

			<view></view>
			<input v-model="username" type="text" style="border-bottom: 1rpx #eee solid;"
				:placeholder="$t('login.please-enter-account')" />
			<input v-model="password" type="password" style="border-bottom: 1rpx #eee solid;"
				:placeholder="$t('login.please-enter-password')" />
			<button class="login-btn" style="margin-top: 48rpx;" @tap="login">{{$t('login.log-in')}}</button>
			<button class="register-btn" @click="switchToRegister">{{$t('login.sign-in')}}</button>
		</div>

		<div class="register" v-if="showRegister">
			<h3 style="padding-bottom: 48rpx;text-align: center;">{{$t('login.welcome-register')}}</h3>

			<input v-model="newUsername" type="text" style="border-bottom: 1rpx #eee solid;"
				:placeholder="$t('login.please-enter-account')" />
				
			<input v-model="newPassword" type="password" style="border-bottom: 1rpx #eee solid;"
				:placeholder="$t('login.please-enter-password')" />
				
			<input v-model="newPasswordAgain" type="password" style="border-bottom: 1rpx #eee solid;"
				:placeholder="$t('login.please-enter-password-again')" />
				
			<button class="register-btn" style="margin-top: 48rpx;" @click="register"> {{$t('login.sign-in')}} </button>
			<button class="login-btn" @click="switchToLogin">  {{$t('login.back-to-login')}}  </button>
		</div>
		  <!-- 使用你的 tabbar 组件 -->
		     <!-- <tabbar :current="0"></tabbar> -->
	</view>
	 
</template>


<script>
	const request = require("../../utils/request.js")
	import {uniPopup} from '@dcloudio/uni-ui'
	export default {
		components: { uniPopup },
		data() {
			return {
			      username: "",
			      password: "",
			      newUsername: "",
			      newPassword: "",
			      newPasswordAgain: "",
			      showRegister: false,
			      langPopupVisible: false,
			      selectedLanguage: 0, // Index of the selected language
			      languageOptions: ["中文", "English"]
			    };
		},
	
		methods: { 
				toggleLangPopup() {
			      this.langPopupVisible = !this.langPopupVisible;
			    },
			    cancelLangSelection() {
			      this.langPopupVisible = false;
			    },
			    confirmLangSelection() {
			      // Implement your logic here
			      this.langPopupVisible = false;
			    },
			    onLanguageChange(event) {
				  const local = uni.getLocale();
				  if (local == 'en') {
				  	uni.setLocale('zh');
				  	this.$i18n.locale = 'zh';
				  } else {
				  	uni.setLocale('en');
				  	this.$i18n.locale = 'en';
				  }
			      // Handle language change event
			      this.selectedLanguage = event.detail.value;
			    },
			 
			login() {
				// 处理登录逻辑
				// 检查账号密码是否正确
				// 如果正确则登录，否则提示错误信息
				var that = this
				if (this.username == '') {
					uni.showToast({
						title: that.$t('login.please-enter-account')
					})
					return
				}
				if (this.password == '') {
					uni.showToast({
						title: that.$t('login.please-enter-password')
					})
					return
				}
				var data = {
					userName: that.username,
					passWord: that.password
				}
				request.request({
					url: '/api/v1/ucenter/login',
					method: 'post',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							uni.showToast({
								title: that.$t('login.login-success'),
								icon: 'success'
							})
							uni.setStorageSync('token', res.data.data.token)
							uni.setStorageSync('header', res.data.data.tokenHeader)

							uni.setStorageSync('userInfo', res.data.data.userInfo)
							setTimeout(() => {
							     uni.switchTab({
							         url: '/pages/home/home'
							     })
							}, 1000);                  
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			getUserInfo() {
				request.tokenRequest({
					url: '/api/v1/ucenter/login',
					method: 'post',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {

						}
					}
				})
			},
			register() {
				// 处理注册逻辑
				// 创建新账号并进行相关操作
				var that = this
				if (this.newUsername == '') {
					uni.showToast({
						title: "Please enter your account number"
					})
					return
				}
				if (this.newPassword == '') {
					uni.showToast({
						title: "Please enter password"
					})
					return
				}
				if (this.newPasswordAgain == '') {
					uni.showToast({
						title: "Please enter your password again"
					})
					return
				}
				if (this.newPasswordAgain != this.newPassword) {
					uni.showToast({
						title: "The two passwords are different"
					})
					return
				}


				var data = {
					fatherCode: 'UJWB',
					userName: that.newUsername,
					passWord: that.newPassword,
					nickName: that.newUsername
				}
				request.request({
					url: '/api/v1/ucenter/register',
					method: 'post',
					dataType: 'json',
					data: data,
					ok: function(res) {
						console.log((res))
						if (res.data.code == '200') {
							uni.showModal({
								title: 'Tips',
								content: res.data.message + '，Please login again',
								showCancel: false,
								confirmText: 'Login',
								success: () => {
									that.switchToLogin()
								}
							})
						} else {
							uni.showToast({
								title: res.da.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			switchToRegister() {
				this.showRegister = true;
			},
			switchToLogin() {
				this.showRegister = false;
			}
		}
	};
</script>

<style scoped>
	page {
		background: white;
	}

	.login-page {
		background: white;
		padding: 48rpx 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login {
		margin-top: 32rpx;
		width: 600rpx;
	}

	.register {
		margin-top: 32rpx;
		width: 600rpx;
	}

	input {
		margin: 24rpx 10rpx;
		padding: 5rpx;
	}

	button {
		margin: 24rpx auto;
		width: 400rpx;
		padding: 15rpx 28rpx;
		line-height: 48rpx;
		width: 200rpx;
	}

	.login-btn {
		width: 400rpx;
		color: white;
		font-size: 32rpx;
		background: #4cb81b;
	}

	.register-btn {
		width: 400rpx;
		color: white;
		font-size: 32rpx;
		background: #2093f5;
	}
	
	/* ... Your existing styles ... */
	.lang-icon {
	  width: 40rpx;
	  height: 40rpx;
	  margin-top: 20rpx;
	}
	.lang-popup {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.picker {
	  margin-top: 20rpx;
	}
	.lang-btn {
	  margin: 10rpx;
	  font-size: 28rpx;
	}
	.header {
	  position: absolute;
	  top: 20rpx;
	  right: 20rpx;
	}
	
	.lang-icon {
	  width: 40rpx;
	  height: 40rpx;
	}
</style>