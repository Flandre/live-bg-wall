@echo off
chcp 65001 >nul
title 直播统计管理系统服务器

echo.
echo ====================================
echo   🎮 直播统计管理系统服务器
echo ====================================
echo.

echo 📍 当前目录：%cd%
echo 🌐 管理界面：http://localhost:13691
echo 📁 统计文件：%cd%\..\count\地下城统计新.txt
echo.

if not exist "node_modules" (
    echo 📦 正在安装依赖包...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
    echo.
)

echo 🚀 正在启动服务器...
echo 💡 按 Ctrl+C 停止服务器
echo ====================================
echo.

timeout /t 1 >nul
start "" http://localhost:13691
node server.js
