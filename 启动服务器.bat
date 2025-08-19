@echo off
chcp 65001 >nul
title 直播统计数据管理系统

echo.
echo ==========================================
echo     🎮 直播统计数据管理系统
echo ==========================================
echo.

echo [1/4] 检查Node.js环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未找到Node.js
    echo 请先安装Node.js：https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js环境正常

echo.
echo [2/4] 检查项目文件...
if not exist "server\server.js" (
    echo ❌ 错误：未找到服务器文件
    echo 请确保在正确的项目目录中运行此脚本
    echo.
    pause
    exit /b 1
)
echo ✅ 项目文件完整

echo.
echo [3/4] 检查依赖包...
cd server
if not exist "node_modules" (
    echo 📦 正在安装依赖包...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖包已存在
)

echo.
echo [4/4] 启动服务器...
echo.
echo 🌐 管理界面地址：http://localhost:13691
echo 📁 统计文件位置：%cd%\..\count\地下城统计.txt
echo.
echo 💡 提示：
echo    - 按 Ctrl+C 停止服务器
echo    - 关闭此窗口也会停止服务器
echo    - 服务器启动后会自动打开管理界面
echo.
echo 正在启动服务器...
echo ==========================================

timeout /t 2 >nul
start "" http://localhost:13691
node server.js
