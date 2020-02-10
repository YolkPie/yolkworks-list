<template>
  <div class="detail main">
    <div class="detail__inner w1" v-if="name && name.length">
      <div class="detail__snapshot">
        <img class="detail__img" :src="info.screenshot" alt="">
      </div>
      <div class="detail__content">
        <div class="detail__info">
          <h3 class="detail__title">{{this.info.title}}</h3>
          <p class="detail__subtitle">{{this.capitalize(this.info.name.replace(/-/g, ' '))}}</p>
          <div class="detail__main">
            <a class="detail__link"
               :href="`https://github.com/YolkPie/${info.type}-materials/tree/master/${info.materialType}/${this.name}`">查看代码</a>
          </div>
        </div>
        <div class="detail__info">
          <h3 class="detail__title">使用说明</h3>
          <div class="detail__main">
              <pre class="detail__code">
                <p># 命令行方式</p>
                <p>$ npm i -g yolkworks</p>
                <p>$ cd src/components</p>
                <p>$ yolkworks add @yolkpie/{{this.$route.params.id}}</p>
              </pre>
          </div>
        </div>
        <div class="detail__info">
          <h3 class="detail__title">模块说明</h3>
          <div class="detail__main">
            <pre class="detail__desc">{{info.title}}</pre>
          </div>
        </div>
      </div>
    </div>
    <not-found v-else></not-found>
  </div>
</template>
<script>
import getTempList from '../../scripts/getTempList'
import camelCase from 'camelcase'
import NotFound from '../../components/not-found'

export default {
  name: 'Detail',
  data () {
    return {
      name: '',
      info: {}
    }
  },
  components: {
    NotFound
  },
  created () {
    this.getDetailInfo()
  },
  methods: {
    /**
     * 获取详情
     */
    getDetailInfo () {
      const name = this.$route.params.id
      if (name && name.length) {
        const tempArr = name.split('-')
        if (tempArr.length >= 3) {
          const type = tempArr[0]
          const materialType = tempArr[tempArr.length - 1]
          let tempName = name.substring(name.indexOf('-') + 1, name.lastIndexOf('-'))
          tempName = camelCase(tempName, { pascalCase: true })
          const info = getTempList.getTempInfo(type, materialType + 's', tempName)
          if (info && Object.keys(info).length) {
            this.info = info
            this.name = tempName
          }
        }
      }
    },
    /**
     * 每个英文单词首字母大写
     * @param str
     * @returns {void | string | *}
     */
    capitalize (str) {
      return str.replace(/(^|\s)([a-z])/g,
        (m, p1, p2) => {
          return p1 + p2.toUpperCase()
        })
    }
  }
}
</script>
