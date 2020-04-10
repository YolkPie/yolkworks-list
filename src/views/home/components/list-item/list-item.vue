<template>
  <div class="item">
    <a href="javascript:;" class="item__inner" @click="jumpToDetail">
      <div class="item__snapshot">
        <img class="item__img" :src="item.screenshot" alt="">
      </div>
      <p class="item__name">{{item.title}}</p>
    </a>
  </div>
</template>
<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    jumpToDetail () {
      this.$router.push({
        path: '/detail/' + this.item.type + '-' + this.item.name + '-' + this.item.materialType.substring(0, this.item.materialType.length - 1)
      })
    }
  }
}
</script>
