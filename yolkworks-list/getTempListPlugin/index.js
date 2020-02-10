const ora = require('ora')
const getTempList = require('./lib/getTempList')

class getTempListPlugin {
  apply (compiler) {
    this.ora = ora('获取模板列表中，请耐心等待。。。')
    this.hasLoaded = false
    compiler.hooks.beforeCompile.tapAsync('GetTempListPlugin', (compilation, callback) => {
      if (this.hasLoaded) {
        if (this.loadingText) {
          this.loadingText.stop()
        }
        callback()
        return
      }
      this.loadingText = this.ora.start()
      getTempList().then(jsonData => {
        // 区分DefinePlugin插插件，并在process.env中添加TEMP_LIST_DATA
          const plugins = compiler.options.plugins
          for (let i = 0; i < plugins.length; i++) {
            if (plugins[i] && plugins[i].definitions) {
              plugins[i].definitions['process.env'].TEMP_LIST_DATA = jsonData
            }
          }
          this.loadingText.succeed('获取模板列表完成')
          this.hasLoaded = true
          callback()
      }).catch(error => {
        this.loadingText.fail('获取模板列表失败')
        console.log(error);
        callback()
      })
    })
  }
}

module.exports = getTempListPlugin

