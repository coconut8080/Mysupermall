<!-- homeswiper -->
<template>
  <div>
    <!-- 轮播图开始 -->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banners" :key="item.image">
          <a :href="item.link">
            <img :src="item.image" alt @load="imageLoad" />
          </a>
        </mt-swipe-item>
      </mt-swipe>
    <!-- 轮播图结束 -->
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
import "mint-ui/lib/style.css";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");

        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  text-align: center;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>
