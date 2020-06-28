<!-- toast -->
<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: ""
    };
  },
  methods: {
    show(msg, duration =1000) {
      console.log(1111);
      
      this.message = msg;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 9999;
  color: #fff;

  background-color: rgba(0, 0, 0, 0.75);
}
</style>
