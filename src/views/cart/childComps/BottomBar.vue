<!-- button bar -->
<template>
  <div id="bottom-bar">
    <check-button :value="isSelectAll" class="select-all" @click.native="checkClick" />
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy-product" @click="buyClick">结算({{cartCount}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CheckButton
  },
  data() {
    return {};
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["cartLength", "cartList"]),
    // 计算总价格
    totalPrice() {
      const cartList = this.$store.state.cartList;
      return (
        "￥" +
        cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.newPrice;
          }, 0)
      );
    },
    // 结算数量
    cartCount() {
      const cartList = this.$store.state.cartList;
      return cartList.filter(item => item.checked).length;
    },
    // 全选按钮
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 使用find
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      // console.log(1);
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //部分或者全部不选择中
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    // 结算吐司
    buyClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择商品',2000)
      }
    }
  }
};
</script>

<style scoped>
#bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px -3px rgba(0, 0, 0, 0.2);
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
