<template>
  <div class="category">
    <div class="w">
      <div class="category__inner">
        <ul class="category__items">
          <li v-for="cate in cateList" :key="cate.id" class="category__item" :class="cate.id === currentId ? 'category__item--active' : ''">
            <a href="javascript:;" @click="() => changeCurrent(cate.name, cate.id)">{{cate.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  props: {
    cateList: {
      type: Array
    },
    currentId: {
      type: [String, Number]
    }
  },
  methods: {
    /**
     * 选中当前类目
     * @param cateName
     * @param cateId
     */
    changeCurrent (cateName, cateId) {
      if (this.currentId === cateId) return
      this.$emit('change', cateName, cateId)
    }
  }
}
</script>
