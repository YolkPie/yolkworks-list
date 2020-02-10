<template>
  <div class="nav">
    <div class="w">
      <div class="nav__inner">
        <img class="nav__logo" src="../../assets/img/logo.png" alt="yolkpie">
        <h1 class="nav__title">YolkPie</h1>
        <div class="nav__search">
          <input type="text" class="nav__search__input" placeholder="search">
          <s class="nav__search__btn"></s>
        </div>
        <i class="nav__more" @click="toggleItems"></i>
        <div class="nav__items" v-show="isWide || (!isWide && itemsShow)">
          <a href="//yolkpie.net/" class="nav__items__item">关于我们</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { on } from '@yolkpie/utils'
export default {
  name: 'Nav',
  data () {
    return {
      isWide: document.documentElement.clientWidth > 1200, // 是否为宽屏
      itemsShow: this.isWide // 列表显隐（默认宽屏展示／窄屏隐藏）
    }
  },
  mounted () {
    on(window, 'resize', this.onWindowResize)
  },
  methods: {
    /**
     * 列表项显隐
     */
    toggleItems () {
      this.itemsShow = !this.itemsShow
    },
    onWindowResize () {
      this.isWide = document.documentElement.clientWidth > 1200
    }
  }
}
</script>
