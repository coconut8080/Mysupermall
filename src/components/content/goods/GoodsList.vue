<!-- goodslist -->
<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>
