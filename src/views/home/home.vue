<template>
  <div class="home main">
    <banner></banner>
    <category :cate-list="cateList" :current-id="currentCateId" @change="changeCate"></category>
    <list :items="items"></list>
  </div>
</template>
<script>
import Banner from './components/banner'
import Category from './components/category'
import List from './components/list'
import getTempList from '../../scripts/getTempList'

export default {
  name: 'Home',
  data () {
    return {
      cateList: [{
        id: '',
        name: '全部'
      }], // 所有类目（默认全部）
      currentCateId: '', // 当前选中类目（默认全部
      items: [] // 组件／模板列表
    }
  },
  components: {
    Banner,
    Category,
    List
  },
  created () {
    this.getCates()
    this.getAllList()
  },
  methods: {
    /**
     * 获取分类
     */
    getCates () {
      const cates = getTempList.getTypes()
      cates.forEach((cate, index) => {
        this.cateList.push({
          name: cate,
          id: index
        })
      })
    },
    /**
     * 根据分类名称获取模板列表
     * @param cateName
     * @returns {[]}
     */
    getListByCateName (cateName) {
      return getTempList.getTempsByType(cateName)
    },
    /**
     * 获取全部模板列表
     */
    getAllList () {
      const cateNames = []
      this.items = []
      this.cateList.forEach(cate => {
        if (cate.id !== '') {
          cateNames.push(cate.name)
        }
      })
      cateNames.forEach(cateName => {
        this.items = this.items.concat(this.getListByCateName(cateName))
      })
    },
    changeCate (cateName, cateId) {
      if (cateId === '') {
        this.getAllList()
      } else {
        this.items = this.getListByCateName(cateName)
      }
      this.currentCateId = cateId
    }
  }
}
</script>
