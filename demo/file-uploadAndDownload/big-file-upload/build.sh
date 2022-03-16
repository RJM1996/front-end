#! /bin/sh

# 前端独立部署
# 需要将打包文件 dist 文件夹上传到 gitlab, 然后在开发机上下载最新的 dist 文件, 重启 nginx

# 获取当前项目路径
curPath=$(
  cd "$(dirname "$0")"
  pwd
)
cd "${curPath}"

# 打包
echo "开始打包..."
rm -rf dist
npm run build
if [ $? -eq 0 ]; then
  echo "\033[32m webpack build release OK! \033[0m"
else
  echo "[ERROR] webpack build release failed"
  exit 0
fi

# 上传打包文件
git add -f ./dist
git commit -m "🔧build(提交打包文件)"
git push

if [ $? -eq 0 ]; then
  echo "\033[32m push finish! \033[0m"
else
  echo "\033[31m [ERROR] push failed! \033[0m"
  exit 0
fi
