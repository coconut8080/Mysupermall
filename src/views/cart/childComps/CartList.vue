<!-- Cart List -->
<template>
  <div class="cart-list">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
  </div>
</template>

<script>

import CartListItem from "./CartListItem";
export default {
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    CartListItem
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
  /* position: relative; */

}
.content {
  height: 100%;
  overflow: hidden;
  /* overflow: hidden; */
  /* position: absolute;
  top: 1px;
  bottom: 0;
  left: 0;
  right: 0; */
}
</style>
