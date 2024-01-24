<template>
	<view>
		<view class="foot-box"></view>
		<u-tabbar 
			:value="current?current:0" 
			@change="changeTab" 
			:fixed="true" 
			:placeholder="false"
			:safeAreaInsetBottom="true" 
			:border="false"
			activeColor="#50E8B4"
			inactiveColor="#999"
			:class="theme === 'light' ? '' : 'u-tabbar-box'"
		>
			<u-tabbar-item v-for="(item,index) in navList" :key="index" :text="language[item.langKey]">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="theme === 'light' ? item.iconPath : item.iconPath1"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
 
<script>
	export default {
		name: "tabbar",
		props: {
			current: Number
		},
		computed: {
			theme() {
				return this.$store.state.theme
			},
			language() {
				return this.$mBaseData[this.$store.state.language]
			}
		},
		created() {
			//隐藏原生tabbar
			uni.hideTabBar()
		},
		data() {
			return {
				navList: [
					{
						 
						text: '首页',
						 
						customIcon: false,
						pagePath: "pages/index/index"
					},
					{
					 
						text: '盲盒',
					 
						customIcon: false,
						pagePath: "pages/blindBox/index"
					},
					{
					 
						text: '资产',
						
						customIcon: false,
						pagePath: "pages/property/index"
					} 
				],
			}
		},
		methods: {
			changeTab(e) {
				console.log(this.navList[e].pagePath)
				uni.switchTab({
					url: '/' + this.navList[e].pagePath,
				})
			}
		}
	}
</script>
 
<style scoped>
	.foot-box{
		width: 100vw;
		height: 120rpx;
		
	}
	/deep/ .u-tabbar-box .u-tabbar__content{
		background-color: #000;
	}
	.u-page__item__slot-icon{
		width: 20px!important;
		height: 20px!important;
	}
</style>