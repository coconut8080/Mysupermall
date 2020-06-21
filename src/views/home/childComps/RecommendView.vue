<!-- recommendview -->
<template>
  <div>
    <div class="recommend">
      <div v-for="item in recommends" :key="item.title" class="recommend-item">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
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
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  /* justify-content: space-between; */
  align-items: center;
  padding: 15px 0;

  border-bottom: 10px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend img {
  width: 78px;
  height: 78px;
  margin-bottom: 10px;
}
</style>
