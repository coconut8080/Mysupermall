<!-- 购物车 -->
<template>
  <div id="cart">
    <!-- 导航开始 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 导航结束 -->

    <!-- 商品的列表 开始 -->
    <scroll class="content" ref="scroll">
      <cart-list :cart-list="cartList"></cart-list>
    </scroll>
    <!-- 商品的列表 结束 -->

    <!-- 全选按钮 结算总价 -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar"

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    Scroll,
    BottomBar
  },
  data() {
    return {};
  },
  activated() {
    // console.log(111);
    this.$refs.scroll.refresh();
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["cartLength", "cartList"])
  }
};
</script>

<style scoped>
#cart {
  position: relativse;
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
