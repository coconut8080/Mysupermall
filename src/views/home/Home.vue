<!-- 首页 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <tab-container
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabContainer1"
      v-show="isTabFixed"
      class="tab-control"
    ></tab-container>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <tab-container :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabContainer2"></tab-container>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/homeSwiper";
import RecommendView from "./childComps/RecommendView";

import NavBar from "components/common/navbar/NavBar";
import TabContainer from "components/content/TabContainer/TabContainer";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import backTop from "components/content/backTop/backTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  components: {
    HomeSwiper,
    RecommendView,

    NavBar,
    TabContainer,
    GoodsList,
    Scroll,
    backTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  created() {
    //1. 请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // // 1.图片加载完成的监听事件 Vue.prototype.$bus = new Vue()  @load="imageLoad"
    // // debounce添加防抖函数 优化性能
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    //页面活跃时
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // console.log('activated：'+this.saveY);

    // 刷新页面
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 页面未选中时(不活跃)
    this.saveY = this.$refs.scroll.getSaveY();
    // console.log('deactivated：'+this.saveY);

    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 监听事件相关的数据
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabContainer1.currentIndex = index;
      this.$refs.tabContainer2.currentIndex = index;
    },
    // 返回顶部点击事件
    backClick() {
      console.log("返回顶部点击事件");
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 返回顶部按钮隐藏和显示
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;

      // 决定tabContainer 是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    // 上拉加载更多功能
    loadMore() {
      console.log("上拉加载更多功能");
      this.getHomeGoods(this.currentType);
    },
    // 监听轮播图的加载
    swiperImageLoad() {
      // console.log(111);
      this.tabOffsetTop = this.$refs.tabContainer2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关的数据
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成请求数据
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* width: 100vw; */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
  top: -2px;
}
</style>
