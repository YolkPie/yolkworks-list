const path = require('path');
const fs = require('fs');

// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, deep) {
  let curPath = path.join(dir, curDir);
  // 达到搜索深度，停止
  if(deep) {
    if (curDir.toLowerCase().indexOf('package.json') !== -1) {
      // package.json文件,获取组件或模板的信息
      const pkg = fs.readFileSync(dir + '/' + curDir).toString()
      if (pkg && pkg.length) {
        const pkgJson = JSON.parse(pkg)
        if (pkgJson.blockConfig) {
          const config = pkgJson.blockConfig
          obj = Object.assign(obj, config)
          const folders = dir.split('/').splice(-3)
          obj['materialType'] = folders[1]
          obj['type'] = folders[0]
        }
      }
    } else {
      // 排除指定文件
      const exceptions = ['readme', 'src', 'license']
      for (let i = 0; i < exceptions.length; i++) {
        if (curDir.toLowerCase().indexOf(exceptions[i]) !== -1) return
      }
      obj[curDir] = curDir;
    }
    if(fs.statSync(curPath).isDirectory()) {
      obj[curDir] = {};
      let lists = fs.readdirSync(curPath);
      lists.forEach(list => getIndexOfPathByDeep(obj[curDir], curPath, list, deep - 1))
    }
  }

}

// 获取指定路径 path 下的，默认深度为 4 的目录 JSON
module.exports = function (dir, deep = 4) {
  let dirDevide = dir.split('/');
  let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
  let index = {};
  getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDevide[0], deep + 1);
  return index;
}
