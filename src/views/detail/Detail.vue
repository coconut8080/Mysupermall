<!-- detail -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-baseInfo :goods="goods"></detail-baseInfo>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>

      <detail-params-info ref="params" :param-info="paramInfo"></detail-params-info>

      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>

      <!-- <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info> -->
      <goods-list ref="recommend" :goods="recommendList"></goods-list>

      <!-- {{$store.state.cartList}} -->
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";

import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    // DetailRecommendInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求的详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 1. 获取轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4. 保存商品详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 保存评论的数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res, error) => {
      if (error) return;
      this.recommendList = res.data.list;
      // console.log(this.recommendList);
    });

    // 使用防抖函数不用频繁获取 offsetTop
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // 获取js的最大值
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  destroyed() {
    // console.log("detail destroyed");
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();

      this.getThemeTopYs();
    },
    // nav的点击事件 从detailNavBar传过来的
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听滚动到哪一个主题
    contentScroll(position) {
      // 获取Y值
      const positionY = -position.y;
      // console.log(position);
      let length = this.themeTopYs.length;
      // console.log(length); 4
      // 方案一：
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY > this.themeTopYs[i]))
      //   ) {
      //     // console.log(i);
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // 方案二：
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
        }
      }
      // 2.监听返回顶部显示 隐藏

      // 判断backTop是否显示
      // this.isShowBackTop = Math.abs(position.y) > 1000;
      this.ShowBackTop(position);
    },
    // 点击加入购物车
    addToCart() {
      console.log("点击加入购物车");
      // 1 创建对象
      const product = {};

      // 对象信息
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;

      // console.log(obj);
      // this.$store.commit('addCart',product)
      // this.$store.dispatch("addCart", product);

      this.addCart(product).then(res => {   
        // console.log(this.$toast);
        this.$toast.show(res, 2000);
        console.log(res);
        
      });
      //  console.log(this.$store.state.cartList);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
