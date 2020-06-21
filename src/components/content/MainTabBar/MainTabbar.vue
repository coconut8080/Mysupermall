<!--  -->
<template>
  <div>
    <tab-bar>
      <tab-barItem path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
        <div slot="item-text">首页</div>
      </tab-barItem>
      <tab-barItem path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
        <div slot="item-text">分类</div>
      </tab-barItem>
      <tab-barItem path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt />
        <div slot="item-text">购物车</div>
      </tab-barItem>
      <tab-barItem path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
        <div slot="item-text">我的</div>
      </tab-barItem>
    </tab-bar>
  </div>
</template>

<script>
import tabBar from "components/common/tabbar/TabBar";
import tabBarItem from "components/common/tabbar/TabBarItem";
export default {
  data() {
    return {};
  },
  components: {
    tabBar,
    tabBarItem
  }
};
</script>

<style scoped>
</style>
