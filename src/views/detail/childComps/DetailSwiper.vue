<!-- detail swipe -->
<template>
  <div id="swiper">
    <!-- 轮播图开始 -->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in topImages" :key="item">
            <img :src="item"/>
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
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.mint-swipe {
  /* width: 300px; */
  height: 300px;
  /* overflow: hidden; */
}
.mint-swipe-item {
  text-align: center;
}
.mint-swipe-item img {
  width: 80%;
  height: 100%;
  
}
</style>
