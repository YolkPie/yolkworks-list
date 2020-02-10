<template>
  <div class="list">
    <div class="w">
      <ul class="list__items">
        <list-item class="list__item" v-for="(item, index) in items" :key="index" :item="item"></list-item>
      </ul>
    </div>
  </div>
</template>
<script>
import ListItem from '../list-item'
export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    items: {
      type: Array
    }
  }
}
</script>
