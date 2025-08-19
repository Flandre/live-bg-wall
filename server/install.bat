@echo off
echo 正在安装直播统计管理系统...
echo.

echo [1/3] 检查Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js 已安装 ✓

echo.
echo [2/3] 安装依赖包...
npm install
if errorlevel 1 (
    echo 错误：依赖安装失败
    pause
    exit /b 1
)
echo 依赖安装完成 ✓

echo.
echo [3/3] 启动服务器...
echo 管理界面将在浏览器中打开：http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.
start http://localhost:3000
npm start
