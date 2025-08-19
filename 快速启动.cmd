@echo off
chcp 65001 >nul
title 直播统计管理 - 快速启动

:: 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo 请先安装Node.js！
    start https://nodejs.org/
    pause
    exit
)

:: 进入server目录并启动
cd /d "%~dp0server"
start "" http://localhost:13691
node server.js
