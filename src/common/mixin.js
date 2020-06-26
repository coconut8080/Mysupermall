import { debounce } from './utils';
import backTop from "components/content/backTop/backTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // 1.图片加载完成的监听事件 Vue.prototype.$bus = new Vue()  @load="imageLoad"
    // debounce添加防抖函数 优化性能
    this.refresh = debounce(this.$refs.scroll.refresh, 50);

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log('我是混入中的内容');

  },
}

/**
 * 返回顶部点击事件
 */
export const backTopMixin = {
  components: {
    backTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    ShowBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000;
    }
  },
}