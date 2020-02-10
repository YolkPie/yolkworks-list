const tempList = {
  list: process.env.TEMP_LIST_DATA || {},
  init () {
    this.types = this.getTypes()
  },
  /**
   * 获取组件类型（react or vue）
   */
  getTypes () {
    return this.list ? Object.keys(this.list) : []
  },
  /**
   * 根据组件类型获取对应组件列表
   * @param type
   */
  getTempsByType (type) {
    if (this.list && this.list[type]) {
      const subTypes = Object.keys(this.list[type])
      const temps = []
      subTypes.forEach(subtype => {
        Object.keys(this.list[type][subtype]).forEach(tempName => {
          temps.push(this.list[type][subtype][tempName])
        })
      })
      return temps
    }
    return []
  },
  /**
   * 获取模板信息
   * @param type
   * @param temp
   */
  getTempInfo (type, materialType, temp) {
    if (this.list && this.list[type] && this.list[type][materialType] && this.list[type][materialType]) {
      return this.list[type][materialType][temp]
    }
    return {}
  }
}

export default tempList
