<!-- DetailRecommendInfo -->
<template>
  <div>
    <goods-list></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
