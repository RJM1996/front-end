# 使用方法: 修改需要添加的模块名称和视图文件名称
# 然后在项目根目录下执行 sh test.sh
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
" >./src/api/${module_name}/${view_name}.js

echo "
import { getParams } from '@/libs/util'

// 模拟数据定义
" >./src/mock/${module_name}/${view_name}.js

echo "
import config from '@/config'
import {} from '@/api/${module_name}/${view_name}'

const httpStatus = config.httpStatus

const state = {}
const mutations = {}
const getters = {}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
" >./src/store/${module_name}/${view_name}.js

echo "
<template>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "${view_name}",
  components: {},
 data () {
   return {}
 },
 computed: {},
 methods: {},
 created () {}   
}
</script>

<style scoped>
</style>
" >./src/views/pages/${module_name}/${view_name}.vue

echo "// 本地数据" >./src/views/datas/${module_name}/${view_name}.js

if [ $? -eq 0 ]; then
    echo "Done"
else
    echo "Error"
fi
