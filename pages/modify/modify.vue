<template>
	<view class="container">
		<view class="avatar-container">
			<!-- 头像显示区域 -->
			<image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
			<button style="background: white;" class="changeA" @click="changeAvatar"> {{$t('modify.changeAvatar')}} </button>
		</view>

		<view class="form">
			<!-- 昵称输入框 -->
			<view class="form-item">
				<text> {{$t('modify.nickname')}} </text>
				<input v-model="nickname" type="text" :placeholder = "$t('modify.nicknameView')" ></input>
			</view>

			<!-- 密码输入框 -->
			<view class="form-item">
				<text>{{$t('modify.newPassword')}}</text>
				<input v-model="password" type="password" :placeholder="$t('modify.newPasswordView')"></input>
			</view>

			<view class="form-item">
				<text>{{$t('modify.passwordAgain')}}</text>
				<input v-model="passwordAgain" type="password" :placeholder="$t('modify.passwordAgainView')"></input>
			</view>
			<!-- 提交按钮 -->

			<button class="save" @click="saveChanges"> {{$t('modify.save')}} </button>

		</view>
		<button class="logout" @click="loginOut">  {{$t('modify.logOut')}}  </button>
	</view>
</template>

<script>
	const request = require("../../utils/request.js")
	export default {
		data() {
			return {
				avatarUrl: '/static/image/avarta.png', // 头像地址
				nickname: '', // 昵称
				password: '', // 密码
				passwordAgain:'',//再次输入
				userInfo:uni.getStorageSync('userInfo')
				
			};
		},
		onLaunch() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.avatarUrl = userInfo.avatar
		},
		methods: {
			changeAvatar() {
				// 处理更换头像的逻辑
				// 可以调用uni-app提供的图片选择/上传方法
			},
			saveChanges() {
				// 处理保存修改的逻辑，可以发送请求将修改后的信息提交到后端服务器
				// 示例中只是简单地打印修改后的信息
				console.log('新的昵称：', this.nickname);
				console.log('新的密码：', this.password);
				// 可以在此处添加逻辑将数据提交到后端进行保存
				var that = this
				if(this.nickname!=undefined && this.nickname!=''){
					uni.showModal({
						title:'提示',
						content:'是否更换昵称？',
						success: (res) => {
							if(res.confirm){
								var data = {
									id:that.userInfo.id,
									nickName:that.nickname
								}
								that.modifyData(data)
							}
						}
					})
					return
				}
				if(this.password!=undefined && this.password!=''){
					uni.showModal({
						title:'提示',
						content:'是否更换密码？',
						success: (res) => {
							if(res.confirm){
								if(that.password == this.passwordAgain){
									var data = {
										id:that.userInfo.id,
										passWord:that.password
									}
									that.modifyData(data)
								}else{
									uni.showToast({
										title:'请确认输入的相同密码'
									})
								}
							}
						}
					})
				}	
			},
			
			modifyData(data){
				uni.showLoading({
					title:'更新中'
				})
				
				request.tokenRequest({
					url: '/api/v1/ucenter/updateUserInfo',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						uni.hideLoading()
						if (res.data.code == '200') {
							uni.showToast({
								title:'修改成功'
							})
							uni.setStorageSync('userInfo',res.data.data)
							that.nickname =""
							that.password = ""
							that.passwordAgain = ''
							
						}
					}
				})
			},
			
			loginOut() {
			    const local = uni.getLocale();
			    uni.showModal({
			        title: local == 'en' ? 'Reminder' : '提示', // Adjusted the conditional statement
			        content: local == 'en' ? 'Are you sure to log out' : '是否确认退出登录', // Adjusted the conditional statement
			        confirmText: local == 'en' ? 'Confirm' : '退出登录', // Adjusted the conditional statement
			        cancelText: local == 'en' ? 'Cancel' : '取消', // Adjusted the conditional statement
			        success: (res) => {
			            if (res.confirm) {
			                uni.removeStorageSync('token');
			                uni.showToast({
			                    title: '退出成功！'
			                });
			                setTimeout(function () {
			                    uni.reLaunch({
			                        url: '/pages/login/login'
			                    });
			                }, 1500);
			            }
			        }
			    });
			}

		},
	};
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	/* 样式可以根据实际需求进行修改 */
	.container {
		padding: 20px;
	}

	.avatar-container {
		text-align: center;
		margin-bottom: 20px;
	}

	.avatar-container button {
		width: 250rpx;
		font-size: 32rpx;
		margin: 0rpx auto;
	}

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 10px;
	}

	.form {
		background-color: white;
		padding: 20px;
		border: 1prx #eee solid;
		border-radius: 5px;
	}

	.form-item {
		margin-bottom: 15px;
		font-size: 32rpx;
	}

	input {
		width: 92%;
		padding: 10px;
		font-size: 28rpx;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	.save {
		font-size: 32rpx;
		width: 200rpx;
		background: #3194d7;
		color: white;
	}

	.logout {
		font-size: 32rpx;
		width: 200rpx;
		margin-top: 32rpx;
		background: #f5f5f5;
		color: #333;

	}
</style>