# 使用方法:
# 在项目根目录下执行 sh test.sh '模块名称' '视图名称'
# 例如 sh test.sh AccessManage userManage
# 即可生成 views, api, mock, store 相关文件和代码

# 获取命令行参数
module_name=$1
view_name=$2

if [[ $module_name && $view_name ]]; then
    echo "start..."
else
    echo "请输入模块名称"
    exit -1
fi

# 递归创建目录
mkdir -p ./src/api/${module_name}/
mkdir -p ./src/mock/${module_name}/
mkdir -p ./src/store/${module_name}/
mkdir -p ./src/views/pages/${module_name}/
mkdir -p ./src/views/datas/${module_name}/
if [ $? -eq 0 ]; then
    echo "mkdir success"
else
    echo "[ERROR]mkdir FAILED!"
fi
# 创建文件
touch ./src/api/${module_name}/${view_name}.js
touch ./src/mock/${module_name}/${view_name}.js
touch ./src/store/${module_name}/${view_name}.js
touch ./src/views/pages/${module_name}/${view_name}.vue
touch ./src/views/datas/${module_name}/${view_name}.js
if [ $? -eq 0 ]; then
    echo "touch success"
else
    echo "[ERROR]touch FAILED!"
fi
# 导入文件内容
echo "
import axios from '@/libs/axios'

// 接口定义
export const demo = data => {
  return axios.request({
    url: '',
    data
  })
}

" >./src/api/${module_name}/${view_name}.js

echo "
import { getParams } from '@/libs/util'

// 模拟数据定义
export const demo = req => {
  req = getParams(req.body)
  const content = {}
  return {
    code: 200,
    msg: '',
    data: content
  }
}

" >./src/mock/${module_name}/${view_name}.js

echo "
import config from '@/config'
import { demo } from '@/api/${module_name}/${view_name}'

const state = {

}

const mutations = {
  setDemo (state, data) {
    
  }
}

const actions = {
  demo ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      try {
        demo(req)
          .then(res => {
            const data = res.data
            if (+data.code === config.httpStatus) {
              commit('setDemo', data.data)
              resolve()
            } else {
              reject(data.msg)
            }
          })
          .catch(err => {
            reject(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}x

" >./src/store/${module_name}/${view_name}.js

echo "
<template>
  <div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "\'${view_name}\'",
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState("\'${view_name}\'", [''])
  },
  methods: {
    ...mapActions("\'${view_name}\'", [''])
  },
  created () {}   
}
</script>

<style scoped lang="less">
</style>
" >./src/views/pages/${module_name}/${view_name}.vue

echo "// 本地数据" >./src/views/datas/${module_name}/${view_name}.js

# 最后, 在mock的index.js和store的index.js中引入我们的模块
# ./src/store/index.js
# ./src/mock/index.js
# 按行读取文件, 找到指定的行的值, 在这一行写入导入模块的代码

# 定义行数(在这一行进行写入)
mockRow=1
storeRow=1
storeModuleRow=1
tmpRow=1

# 按行读取 mock/index.js
while read line
do 
  mockRow=`expr $mockRow + 1`
  if [[ $line = "import Mock from 'mockjs'" ]]; then
    # echo $mockRow
    # echo $line
    break
  fi
done <./src/mock/index.js

# 按行读取 store/index.js
while read line
do 
  tmpRow=`expr $tmpRow + 1`
  if [[ $line = "import Vuex from 'vuex'" ]]; then
    storeRow=${tmpRow}
    # echo $storeRow
    # echo $line
  fi

  if [[ $line = "modules: {" ]]; then
    storeModuleRow=${tmpRow}
    # echo $storeModuleRow
    # echo $line
    break
  fi
done <./src/store/index.js

mockStr="import \* as ${view_name} from './${module_name}/${view_name}'"
storeStr="import ${view_name} from './${module_name}/${view_name}'"
# 获取到这三个行数之后, 在这一行下面插入导入模块的代码
gsed -i "${mockRow}"a\\"${mockStr}" src/mock/index.js
gsed -i "${storeRow}"a\\"${storeStr}" src/store/index.js
gsed -i "${storeModuleRow}"a\\"    ${view_name}," src/store/index.js

if [ $? -eq 0 ]; then
    echo "Done"
else
    echo "Error"
fi
