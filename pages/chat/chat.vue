<template>
	<view class="chat-page">
		
		<view class="bar">
			<image @click="back" style="position: absolute;left: 24rpx;" src="../../static/image/page-previous.png"> </image> {{$t('home.groupName')}} {{groupType}} USDT
			<view style="position: absolute;right: 24rpx;" v-show="!hasStart" @click="startRed"> {{$t('home.groupPlay')}} </view>
		</view>
		<view style="height: 88rpx;"></view>
		<view :animation="anData" style="height:0;"></view>
		
		
		
		<!-- 消息体 用来获取消息体高度 -->
		<view id="msgList">
			<!-- 消息 -->
			<view class="flex-column-start" v-if="msgList.length" v-for="(item, index) in msgList" :key="index">
				<view class="flex-row-start column-time"></view>
				<view v-if="item.msgType == '红包'|| item.msgType == '普通'">
					
<!-- 发送人消息 是自己发的消息 样式在右边边显示 用户消息 头像可选加入-->
					<view v-if="item.my" class="flex justify-end padding-right one-show  align-start  padding-top">
						<view class="flex justify-end" style="width: 400rpx;margin-top: 12px;">
							<view>
								<view class="user-name">{{ userInfo.nickName }}</view>
								<view class="margin-left padding-chat bg-user-orang"
									style="border-radius: 35rpx;background: #f5f5f5; ">
									<view v-if="item.msgType == '红包'" class="red" style="background: ;">
										<view class="red-envelope" style="background: #c69965;">
											<image style="width: 80rpx;height: 80rpx;" :src="item.content.packetImage"></image>
											<view>
												<text>Had get \n</text>
												<!-- <text>Residue {{item.content.amount}}udst</text> -->
											</view>
											<text>Remming</text>
										</view>
										<view class="red-info">
											<text> {{$t('home.groupRedRemaining')}}
												{{item.content.nowReceiveCount}}:{{item.content.canReceiveCount}}</text>
											<view style="display: flex;align-items: center;">
												<image style="width: 40rpx;height: 40rpx;" src="../../static/image/time.png"></image>0s
											</view>
										</view>
									</view>
									<view v-else>
										<text style="word-break: break-all;">{{ item.content }}</text>
									</view>
								</view>
							</view>
						</view>
						<view>
							<image :src="item.userAvatar" :text="user.face ? '' : user.name" style="width: 80rpx;height: 80rpx;" bg-color="#DDDDDD"></image>
						</view>
					</view>
<!-- 发送人消息 是自己发的消息 样式在右边边显示-->
					
<!-- 接收人消息 不是自己发的消息 样式在左边显示-->
					<view v-else class="flex-row-start margin-left margin-top one-show">
						<view class="chat-img flex-row-center">
							<image mode="aspectFill" style="width: 100rpx;height: 100rpx;" :src="item.userAvatar" :text="item.userName ? '' : item.name" bg-color="#DDDDDD"> </image>
						</view>
						<view class="flex" style="width: 500rpx;">
							<view>
								<view class="other-name">{{ item.userName }}</view>
								<view class="margin-left padding-chat flex-column-start bg-to-color" style="border-radius: 35rpx;">
<!-- 等待领取 用户点击 -->
									<view v-show="item.msgType == '红包' && item.content.status=='等待领取'" class="red" @click="handleMessageClick(item)">
										<view class="red-envelope">
											<image style="width: 80rpx;height: 80rpx;" src="../../static/image/icon_redpackage_color.png"></image>
											<view>
												<text>{{$t('home.groupRedPool')}} {{item.content.amount}} USDT </text>
											</view>
										</view>
										<view class="red-info">
											<text> {{$t('home.groupRedRemaining')}}
												{{item.content.nowReceiveCount}}:{{item.content.canReceiveCount}}</text>
											<view style="display: flex;align-items: center;">
												<image style="width: 40rpx;height: 40rpx;"
													src="../../static/image/time.png"></image>0s
											</view>
										</view>
									</view>
<!-- 等待领取 用户点击 -->
<!-- 领取完成 显示详情 -->
									<view v-show="item.msgType == '红包'&& item.content.status!='等待领取'" class="redInfo">
										<view class="red-envelope" style="background: white; color: #333;">
										    <image style="height: 80rpx; width: 80rpx;" src="../../static/image/billing.png"></image>
											<text style="font-size: smaller;">
											{{$t('home.groupRedBilling')}} <br /> 
											{{$t('home.groupRedPool')}}  {{item.content.amount}} USDT </text> 
										</view>

										<view style="border-bottom: 1rpx #eee solid;border-top: 1rpx #eee solid;padding: 12rpx 0;display: flex;flex-direction: column;">
											<view v-for="(detail, index) in item.content.packetDetails" :key="index"
												style="display: flex; justify-content: space-between;">
												<text style="color: red;">{{ detail.getterName }}</text>
												<text style="color: red;">{{$t('home.groupRedGet')}}  {{ detail.getterAmount }} </text>
											</view>

											<!-- <view style="display: flex;justify-content: space-between;margin-top: 24rpx;">

												<text style="color: red;">{{userInfo.userName}}</text>
												<view style="color: #999;">win the pool<text
														style="color: red;">{{item.content.amount}}</text>
												</view>
											</view> -->
										</view>
										<!-- <view style="color: #3c65be;padding: 12rpx 0;">{{userInfo.userName}}</view>
										<label style="color: #999;font-size: 24rpx;">The amount of red envelopes</label> -->
									</view>
<!-- 领取完成 显示详情 -->
									<!-- 普通消息体 -->
									<view v-show="item.msgType == '普通'" class="red" style="font-size: 32rpx;color:#999;margin: 24rpx;text-align: center;">
										{{item.content}}
									</view>
									<!-- 普通消息体 -->
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-else>
					<view style="font-size: 32rpx;color:#999;margin: 24rpx;text-align: center;">
						{{item.content}} {{item.createTime}}
					</view>
				</view>
		
			</view>
			
			<!-- 防止消息底部被遮 -->
			<view v-if="showHide" class="flex-row-start margin-left margin-top" style="height: 120rpx;"></view>

			<!-- 防止消息底部被遮 -->
			<view style="height: 120rpx;"> </view>
		</view>
		
		
<!-- 底部导航栏  bottom:inputHeight+'px' -->
		<view :style="{position: 'fixed',bottom:inputHeight+'px'}" class="flex-column-center"
			:animation="animationData">
			<view class="bottom-dh-char flex-row-around" style="font-size: 55rpx;">
				<!-- vue无法使用软键盘"发送" -->
				<input @focus="inputBindFocus" @blur="eventHandle" :adjust-position="false" v-model="msg"
					class="dh-input" type="text" style="background-color: #f0f0f0;" @confirm="sendMessage"
					confirm-type="send" :placeholder="$t('home.groupSendView')" />
				<view @click="sendMessage" class="cu-tag bg-main-color send" style="font-size: 32rpx;background: #44c31b;border-radius: 12rpx;">
					{{$t('home.groupSend')}}
				</view>
			</view>
		</view>

<!-- 红包弹窗 -->
		<view class="red-envelope-modal" v-show="showRedEnvelopeModal">
			<view class="red-envelope-content" @click="receiveRedEnvelope">
				<view class="title">
					<image style="width: 40rpx;height: 40rpx;" :src="currentItem.content.packetImage"></image>
					<view>{{currentItem.userName}} red envelope</view>
				</view>
				<view style="font-size: 68rpx;margin-top: 250rpx;">{{currentItem.content.amount}}<label style="font-size: 32rpx;">USDT</label></view>
			</view>
			<image @click="closeRedEnvelopeModal" style="width: 68rpx;height: 68rpx;margin-top: 24rpx;" src="../../static/image/close.png"></image>
		</view>

<!-- 右边分享 客服 -->
		<view class="fixed-buttons">
			<view>
				<image @click="shareToFriend" src="../../static/image/share.png"></image> {{$t('home.groupShare')}}
			</view>
	 
			<view>
				<image @click="openCustomerService"src="../../static/image/service.png"></image> {{$t('home.groupService')}}
			</view>
		</view>

	</view>
</template>

<script>
	import SocketService from "@/utils/socket_service.js";
	const request = require("../../utils/request.js");
	var l ; // rpx和px的比率
	var wh; // 可用窗口高度 
	var mgUpHeight; // 顶部空盒子的高度
	var app = getApp()
	var websocket;
	export default {
		data() {
			return {
				inputMessage: '',
				showRedEnvelopeModal: false,
				groupId: '',
				groupType:'',
				socketOpen: false, //是否连接
				fixed: 'fixed',
				bottom: '50px',
				width: '100%',
				showHideModel: undefined,
				showHide: true,
				msgLoad: false,
				hasStart: false, //是否已经开始游戏
				anData: {},
				animationData: {},
				logoUrl: {},
				msgList: [],
				oldHeight: 0,
				params: { //搜索条件
					talkId: '',
					pageSize: 10,
					page: 1,
				},
				goToIndex: 0, // 前往位置
				msg: "",
				go: 0,
				newMessageNum: 0,
				user: {},
				toUser: {},
				scrollHeight: 0,
				ws: new SocketService(),
				resolve: {},
				currentItem: {
					content: {
						packetImage: ''
					}
				},
				count: 0, //判断socket断开连接请求次数
				inputHeight: 0,
				userInfo: wx.getStorageSync('userInfo')
			};
		}, 
		onLoad(options) {
			this.logoUrl = uni.getStorageSync('logoUrl')
			this.resolve = options
			this.userInfo = uni.getStorageSync("userInfo")
			// 如果需要缓存消息缓存msgList即可
			// 监听键盘拉起
			// 因为无法控制键盘拉起的速度,所以这里尽量以慢速处理
			uni.onKeyboardHeightChange(res => {
				const query = uni.createSelectorQuery()
				query.select('#msgList').boundingClientRect(data => {
					// 若消息体没有超过2倍的键盘则向下移动差值,防止遮住消息体
					var up = res.height * 2 - data.height - l * 110
					if (up > 0) {
						// 动态改变空盒子高度
						this.messageBoxMove(up, 300)
						// 记录改变的值,若不收回键盘且发送了消息用来防止消息过多被遮盖
						mgUpHeight = up
					}
					// 收回
					if (res.height == 0) {
						this.messageBoxMove(0, 0)
					}
				}).exec();
			})
			var query = uni.getSystemInfoSync()

			l = query.screenWidth / 750
			wh = query.windowHeight
			this.scrollHeight = (query.windowHeight - 44) + "px"
			this.user = uni.getStorageSync('userInfo')
			this.toUser = "system" //TODO  系统

			if (options.groupId) {
				this.params.groupId = options.groupId;
				this.getTalkMessage()
			}

			if (options.groupId) {
				this.groupId = options.groupId
			}
			if (options.groupType) {
				this.groupType = options.groupType
			}
			this.sokcet();
			var _this = this;
		},
		// 页面隐藏
		onHide() {
			uni.closeSocket();
		},
		onUnload() {
			uni.closeSocket();
		},
		onPullDownRefresh() {
			this.params.page = this.params.page + 1
			this.getTalkMessage()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReady() {
			// var userInfo = uni.getStorageSync('userInfo')
			// var url = app.globalData.baseWsUrl + "/" + this.groupId + '/' + userInfo.id
			// websocket = new WebSocket(url)
			// websocket.onmessage = function(event){
			// 	var data = JSON.parse((event.data))
			// 	console.log(data)
			// }
		},
		methods: {
			back() {
			    this.$router.replace({ path: '../home/home' });  
			},
			shareToFriend() {
				this.$router.replace({ path: '../share/share' });
			},
			shareCommission() {
				// 处理分享佣金逻辑
			},
			openCustomerService() {
				// 打开客服逻辑
			},
			handleMessageClick(message) {
				// if (message.type === 'red-envelope') {
				// 点击红包类型消息，显示红包弹窗
				this.showRedEnvelopeModal = true;
				this.currentItem = message
				// }
			},
			receiveRedEnvelope() {
				// 在这里处理领取红包的逻辑
				// 模拟领取成功后的操作
				this.getRed(this.currentItem.content.packetCode)
			},
			closeRedEnvelopeModal() { // 关闭红包弹窗
				this.showRedEnvelopeModal = false;
			},
			eventHandle() {
				this.inputHeight = 0
			},
			inputBindFocus(e) {
				if (e.detail.height) {
					this.inputHeight = e.detail.height //这个高度就是软键盘的高度
				}
			},
			
			
			//点击开始发包
			startRed() {
				var that = this
				var data = {
					groupId: that.groupId,
					senderId: that.userInfo.id
				}
				request.tokenRequest({
					url: app.globalData.imUrl + '/mqtt/v1/sendRed',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							uni.showToast({
								title: 'Start success',
								icon: 'success'
							})
						}
					}
				})
			},
			
			//用户抢包
			getRed(code) {
				var that = this
				var data = {
					groupId: that.groupId,
					getterId: that.userInfo.id,
					redCode: code
				}
				request.tokenRequest({
					url: app.globalData.imUrl + '/mqtt/v1/getRed',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							uni.showToast({
								title: 'Win the red envelope',
								icon: 'success'
							})
							// that.getRedDetail(code)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "error"
							})
						}
						that.closeRedEnvelopeModal();
						that.currentItem = {
							content: {
								packetImage: ''
							}
						}
					}
				})
			},
			
			//获取红包详情 弃用 需要在弹框里面点击显示详情进行弹框
			getRedDetail(code) {
				var that = this
				var data = {
					redCode: code
				}
				request.tokenRequest({
					url: app.globalData.imUrl + '/mqtt/v1/getRedDetails',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							var userList = res.data.data
							var msgList = that.msgList
							for (let i = 0; i < msgList.length; i++) {
								if (code == msgList[i].content.packetCode) {
									msgList[i].content.status = '已领取'
									msgList[i].list = userList
									break
								}
							}
							that.msgList = msgList
						}
					}
				})
			},
			
			//用户发送普通消息接口
			sendMessageByNet() {
				var that = this
				var data = {
					groupId: that.groupId,
					senderId: that.userInfo.id,
					content: that.msg
				}
				request.tokenRequest({
					url: app.globalData.imUrl + '/mqtt/v1/sendText',
					method: 'get',
					dataType: 'json',
					data: data,
					ok: function(res) {
						if (res.data.code == '200') {
							// uni.showToast({
							// 	title: 'Send success'
							// })
							that.msg = ''
						}
					}
				})
			},

			sendMessage() {
				if (this.msg == "") {
					return 0;
				}
				// if (this.socketOpen == false) {
				// 	return
				// }
				// let msg = {
				// 	operation_type: "MESSAGE",
				// 	to: this.toUser.userId,
				// 	from: this.user.id,
				// 	message_type: "MESSAGE",
				// 	context: this.msg,
				// 	talk_id: this.params.talkId,
				// }
				// let data = JSON.stringify(msg);
				// uni.sendSocketMessage({
				// 	data: data,
				// });
				this.sendMessageByNet()
			},


			//订阅后台群组推送消息的链接
			sokcet() {
				var _this = this;
				uni.closeSocket();
				this.userInfo = uni.getStorageSync('userInfo')
				this.socketOpen = false;
				try {
					//WebSocket的地址
					var url = app.globalData.baseWsUrl + _this.groupId + '/' + this.userInfo.id
					// config.baseWsUrl + '/' + storage.getAccessToken();
					uni.connectSocket({
						url: url,
					});
					// 监听WebSocket连接已打开
					uni.onSocketOpen(function(res) {
						_this.socketOpen = true;
					});
					if (!this.socketOpen) {
						// 监听连接失败
						uni.onSocketError(function(err) { 
							if (_this.count < 3) {
								if (err && err.code != 1000) {
									_this.socketOpen = true;
									console.log('url：' + url)
									setTimeout(() => {
										uni.connectSocket({
											url: url,
										});
									}, 2000)
								}
							} else {
								uni.closeSocket();
							}
							this.count++
						});
					}
					// 监听收到信息
					uni.onSocketMessage(function(res) {
						res.data = JSON.parse(res.data)
						console.log(res.data);
						if (res.data.content != undefined && res.data.msgType == '红包') {
							res.data.content = JSON.parse(res.data.content)
						}
						if (res.data.userId === _this.userInfo.id) {
							res.data.my = true
						}
						// if (res.data.msgType == '红包' && (res.data.userId === _this.userInfo.id || res.data.content
						// 		.canReceiveCount == res.data.content.nowReceiveCount)) {
						// 	_this.getRedDetail(res.data.content.packetCode)

						if (res.data.msgType == '红包') {
							const packetCode = res.data.content.packetCode;
							// 查找是否存在相同packetCode的红包数据
							const existingRedPacketIndex = _this.msgList.findIndex(item => item.content
								.packetCode === packetCode);
							if (existingRedPacketIndex !== -1) {
								// 如果存在相同packetCode的红包数据，更新该条数据
								_this.msgList.splice(existingRedPacketIndex, 1, res.data);
							} else {
								// 否则将新的红包数据添加到msgList中
								_this.msgList.push(res.data);
							}
							_this.msgGo('down');
						} else {
							_this.msgList.push(res.data)
							_this.msgGo('down')
						}
					})
				} catch (e) {
					uni.closeSocket();
				}
				// 监听是否断线，断线进行重新连接
				uni.onSocketClose((res) => {
					if (res.code != null && res.code != 1000) {
						this.sokcet()
					}
				})
			},

			//取消发送
			cancelModel() {
				this.showHide = false
			},

			// 切换输入法时移动输入框(按照官方的上推页面的原理应该会自动适应不同的键盘高度-->官方bug)
			goPag(kh) {
				this.retractBox(0, 250)
				if (this.keyHeight != 0) {
					if (kh - this.keyHeight > 0) {
						this.retractBox(this.keyHeight - kh, 250)
					}
				}
			},
			// 移动顶部的空盒子
			messageBoxMove(x, t) {
				var animation = uni.createAnimation({
					duration: t,
					timingFunction: 'linear',
				})
				this.animation = animation
				animation.height(x).step()
				this.anData = animation.export()
			},
			// 保持消息体可见
			msgGo(type) {
				var that = this
				var go = 0
				const query = uni.createSelectorQuery()
				// 延时100ms保证是最新的高度
				setTimeout(() => {
					// 获取消息体高度
					query.select('#msgList').boundingClientRect(data => {
						// 如果超过scorll高度就滚动scorll

						if (type == 'up') {
							go = data.height - that.oldHeight
						} else if (type == 'down') {
							go = data.height - wh + 120
						}
						// if (this.oldHeight > 0) {
						// 	this.go = data.height - this.oldHeight
						// } else {
						// 	// if (data.height - (wh - 32) > 0) {
						// 	this.go = data.height - wh + 120
						// }
						// 保证键盘第一次拉起时消息体能保持可见
						var moveY = wh - data.height
						// 超出页面则缩回空盒子
						if (moveY - mgUpHeight < 0) {
							// 小于0则视为0
							if (moveY < 0) {
								that.messageBoxMove(0, 200)
							} else {
								// 否则缩回盒子对应的高度
								that.messageBoxMove(moveY, 200)
							}
						}

						uni.pageScrollTo({
							scrollTop: go,
							duration: 0
						})
						that.go = go
						that.oldHeight = data.height
					}).exec();
				}, 100)
			},
			// 回答问题的业务逻辑
			answer(id) {
				// 这里应该传入问题的id,模拟就用index代替了
			},
			// 不建议输入框聚焦时操作此动画
			ckAdd() {
				if (!this.showTow) {
					this.retractBox(-180, 350)
				} else {
					this.retractBox(0, 200)
				}
				this.showTow = !this.showTow
			},
			hideKey() {
				uni.hideKeyboard()
			},
			// 拉起/收回附加栏
			retractBox(x, t) {
				var animation = uni.createAnimation({
					duration: t,
					timingFunction: 'ease',
				})
				this.animation = animation
				animation.translateY(x).step()
				this.animationData = animation.export()
			},
			async getTalkMessage() {
				let type = '';
				var that = this
				request.tokenRequest({
					url: app.globalData.imUrl + '/mqtt/v1/getHistoryMessageByGroupId',
					method: 'get',
					dataType: 'json',
					data: that.params,
					ok: function(res) {
						if (res.data.code == '200') {
							var msg = res.data.data.content
							var start = false

							for (let i = 0; i < msg.length; i++) {
								var m = msg[i]
								// if(!start && m.groupStatus == 'yes'){
								// 	start = true
								// }

								if (m.content != undefined && m.msgType == '红包' && m.msgType !=
									'下线') {
									msg[i].content = JSON.parse(m.content)
								}
							}
							that.hasStart = start
							if (that.msgList.length >= 5) {
								that.msgList.unshift(...msg.reverse())
								type = 'up'
							} else {
								that.msgList.unshift(...msg.reverse())
								type = 'down'
							}
							that.msgList.forEach(item => {
								if (item.userId === that.userInfo.id) {
									item.my = true
								}
								if (item.msgType == '红包' && (item.my || item.content
										.canReceiveCount == item
										.content.nowReceiveCount)) {
									that.getRedDetail(item.content.packetCode)
								}
							})
						}
					}
				})
				this.msgGo(type)
			},


			// 上拉加载
			touchMoreMessage(e) {
				if (e.target.scrollTop == 0) {
					this.params.page = this.params.page + 1
					this.getTalkMessage()
				}
			},
			async getTalk(userId) {
				getTalkByUser(userId).then(res => {
					if (res.data.success) {
						this.toUser = res.data.result
						this.params.talkId = res.data.result.id
						this.getTalkMessage()
					}
				})
			},
			// 处理消息时间是否显示
			compareTime(index, datetime) {
				if (datetime == undefined) {
					return false;
				}
				if (typeof datetime == "number") {
					datetime = this.unixToDate(datetime, "yyyy-MM-dd hh:mm");
				}

				if (this.msgList[index].is_revoke == 1) {
					return false;
				}
				if (datetime) {
					datetime = datetime.replace(/-/g, "/");
				}

				let time = Math.floor(Date.parse(datetime) / 1000);
				let currTime = Math.floor(new Date().getTime() / 1000);

				// 当前时间5分钟内时间不显示
				if (currTime - time < 300) return false;
				// 判断是否是最后一条消息,最后一条消息默认显示时间
				if (index == this.msgList.length - 1) {
					return true;
				}
				let nextDate
				if (this.msgList[index + 1] && this.msgList[index + 1].createTime) {
					nextDate = this.msgList[index + 1].createTime.replace(/-/g, "/");
					if (nextDate - datetime < 300) return false;
				}

				return !(
					this.unixToDate(new Date(datetime), "{y}-{m}-{d} {h}:{i}") ==
					this.unixToDate(new Date(nextDate), "{y}-{m}-{d} {h}:{i}")
				);
			},

			/**
			 * 将unix时间戳转换为指定格式
			 * @param unix   时间戳【秒】
			 * @param format 转换格式
			 * @returns {*|string}
			 */
			unixToDate(unix, format) {
				if (!unix) return unix;
				let _format = format || "yyyy-MM-dd hh:mm:ss";
				const d = new Date(unix);
				const o = {
					"M+": d.getMonth() + 1,
					"d+": d.getDate(),
					"h+": d.getHours(),
					"m+": d.getMinutes(),
					"s+": d.getSeconds(),
					"q+": Math.floor((d.getMonth() + 3) / 3),
					S: d.getMilliseconds(),
				};
				if (/(y+)/.test(_format))
					_format = _format.replace(
						RegExp.$1,
						(d.getFullYear() + "").substr(4 - RegExp.$1.length)
					);
				for (const k in o)
					if (new RegExp("(" + k + ")").test(_format))
						_format = _format.replace(
							RegExp.$1,
							RegExp.$1.length === 1 ?
							o[k] :
							("00" + o[k]).substr(("" + o[k]).length)
						);
				return _format;
			},
		}
	};
</script>


















<style scoped>
	/* 样式可根据实际需求进行调整 */
	/* ... (保持不变) */
	.bar {
		position: fixed;
		display: flex;
		z-index: 999999998;
		align-items: center;
		font-size: 32rpx;
		height: 88rpx;
		width: 100%;
		background: white;
		padding: 24rpx 24rpx;
		border-bottom: 1rpx #eee solid;
		justify-content: center;
	}

	.bar image {
		width: 45rpx;
		height: 45rpx;
	}

	.red-envelope-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.red-envelope-content {
		background: url('../../static/image/red-bg.png') center center no-repeat;
		background-size: 500rpx;
		height: 700rpx;
		width: 700rpx;
		display: flex;
		flex-direction: column;
		color: #d2b843;
		font-size: 32rpx;
		border-radius: 24rpx;
		text-align: center;
	}

	.red-envelope-content button {
		margin-top: 10px;
		height: 48rpx;
		width: 500rpx;
		padding: 8px 16px;
		border-radius: 5px;
	}

	.red-envelope-content .title {
		display: flex;
		align-items: center;
		margin: 32rpx auto;

	}

	.fixed-buttons {
		position: fixed;
		top: 120rpx;
		right: 0rpx;
		font-size: 28rpx;
		display: flex;
		background: white;
		padding: 10rpx;
		border-radius: 12rpx;
		flex-direction: column;

	}

	.fixed-buttons>view {
		display: flex;
		flex-direction: column;
		width: 95rpx;
		text-align: center;
		line-height: 32rpx;
		margin-top: 24rpx;
		align-items: center;
	}

	.fixed-buttons image {
		width: 60rpx;
		height: 60rpx;

	}

	.input-box {
		position: fixed;
		display: flex;
		align-items: center;
		bottom: 0rpx;
		width: 750rpx;
		padding: 12rpx 25rpx;
		border-top: 1rpx #eee solid;
	}

	.input-box input {
		width: 540rpx;
	}

	.input-box button {
		background: #28d831;
		color: white;
		border-radius: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.modalbox-content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.modalbox-content::after {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
	}

	.modalbox-content .box {
		background: #fff;
		width: 625rpx;
		height: 640rpx;
		position: fixed;
		z-index: 2;
		top: 40%;
		left: 47%;
		margin-left: -290rpx;
		margin-top: -310rpx;
		border-radius: 20rpx;
	}


	<style lang="scss" scoped>.send {
		font-size: 24rpx !important;
	}

	.order-time {
		margin-top: 15rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.wrapper {
		height: auto !important;
	}

	.order-list {
		display: flex;
		color: black;
		font-size: 20rpx;
		font-weight: bold;
		width: 95%;
	}

	.order-sn {
		width: 350rpx;

	}

	.name-or-time {
		width: 200rpx;
		margin: 15rpx 15rpx;

	}


	.goods-card {
		border-radius: 20rpx;
		margin-top: 15rpx;
		background-color: #ffffff;
		padding-left: 12rpx;
		width: 95%;
		height: 120rpx;
		display: flex;
		flex-wrap: wrap;
		color: #302c2b;



		.image-box {
			width: 122rpx;
			height: 122rpx;
			overflow: hidden;

			.image {
				width: 122rpx;
				border-radius: 10rpx;
			}
		}
	}

	.cancel {
		color: #737373;
		position: relative;
		bottom: 40rpx;
		left: 12%;
	}

	.cart-message {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottom-dh-char {
		background-color: #f9f9f9;
		width: 750rpx;
		height: 110rpx;
	}

	.user-name {
		text-align: right;
		font-size: 24rpx;
		color: #737373;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}

	.other-name {
		text-align: left;
		font-size: 24rpx;
		color: #737373;
		margin-bottom: 10rpx;
		margin-left: 10rpx;
	}

	.dh-input {
		width: 500rpx;
		height: 65rpx;
		border-radius: 30rpx;
		padding-left: 15rpx;
		font-size: 22rpx;
		background-color: #FFFFFF;
	}

	.column-time {
		justify-content: center;
	}

	.flex-row-around {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.chat-img {
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		background-color: #f7f7f7;
	}

	.padding-chat {
		padding: 17rpx 20rpx;
	}

	.tb-nv {
		width: 50rpx;
		height: 50rpx;
	}

	.order-item {
		margin: 10rpx 0
	}

	.flex-column-start {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flex-column-around {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

	}

	.flex-row-start {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.red {
		background: white;
		border-radius: 24rpx;
		width: 450rpx;
		font-size: 32rpx;

	}

	.red-envelope {
		background: #fbb024;
		color: white;
		border-radius: 24rpx 24rpx 0 0;
		height: 120rpx;
		padding-right: 24rpx;
		display: flex;
		align-items: center;
	}

	.red-info {
		height: 80rpx;
		padding: 0rpx 24rpx;
		display: flex;
		font-size: 26rpx;
		background: white;
		justify-content: space-between;
		align-items: center;
	}

	.redInfo {
		background: white;
		border-radius: 24rpx;
		padding: 12rpx;
		width: 450rpx;
		font-size: 32rpx;
	}


	uni-page-head {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>
<style lang="scss" scoped>
	@import "./index-app.scss";
</style>