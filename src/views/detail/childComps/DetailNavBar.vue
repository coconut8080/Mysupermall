<!-- detail NavBar -->
<template>
  <div id="detail-navbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="nav-titles">
        <div
          v-for="(item,index) in titles"
          :key="item"
          class="nav-titles-info"
          @click="titleClick(index)"
          :class="{active: currentIndex === index}"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    // 点击返回上一页
    backClick(){
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.nav-titles {
  display: flex;
}
.nav-titles-info {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;
}
</style>
