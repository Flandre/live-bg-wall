# 直播统计数据管理系统

一个用于管理直播统计数据的Node.js web应用，可以方便地通过网页界面增减统计数字，数据会实时同步到文本文件中供OBS使用。

## 功能特性

- 🎮 直观的网页管理界面
- ➕➖ 一键增减统计数值
- 🔄 实时数据同步
- 📱 响应式设计，支持移动端
- 🗑️ 批量重置功能
- 💾 自动保存到文本文件

## 安装和使用

### 1. 安装依赖

在 `server` 目录下运行：

```bash
npm install
```

### 2. 启动服务器

```bash
# 生产模式
npm start

# 开发模式（自动重启）
npm run dev
```

### 3. 访问管理界面

打开浏览器访问：http://localhost:13691

## API 接口

### 获取统计数据
```
GET /api/stats
```

### 增加数值
```
POST /api/stats/increment
Content-Type: application/json

{
  "line": "line1",
  "item": "猫本",
  "amount": 1
}
```

### 减少数值
```
POST /api/stats/decrement
Content-Type: application/json

{
  "line": "line1", 
  "item": "猫本",
  "amount": 1
}
```

### 直接设置数值
```
POST /api/stats/update
Content-Type: application/json

{
  "line": "line1",
  "item": "猫本", 
  "value": 10
}
```

### 重置数据
```
POST /api/stats/reset
Content-Type: application/json

{
  "line": "line1",    // 可选：重置指定行
  "item": "猫本"      // 可选：重置指定项目
}
```

## 文件结构

```
server/
├── package.json      # 项目配置和依赖
├── server.js         # 主服务器文件
├── public/
│   └── index.html    # 管理界面
└── README.md         # 说明文档

count/
└── 地下城统计.txt    # 统计数据文件
```

## 数据格式

统计文件格式示例：
```
猫本：0     妖精：0     猫珠：0
困高：39   妖精：3     崩坏：0
```

## 技术栈

- **后端**: Node.js + Express
- **前端**: 原生HTML/CSS/JavaScript
- **数据存储**: 文本文件
- **样式**: CSS3 + Flexbox/Grid

## 注意事项

1. 确保统计文件路径正确：`../count/地下城统计.txt`
2. 服务器会自动创建不存在的统计项目
3. 数值不会小于0（减法操作有下限保护）
4. 支持同时多人访问和操作

## 自定义

你可以根据需要修改：
- 服务器端口（默认13691，更安全的非标准端口）
- 统计文件路径
- 网页界面样式
- API接口功能

## 故障排除

如果遇到问题：
1. 检查Node.js版本（建议16+）
2. 确认统计文件路径是否正确
3. 检查端口是否被占用
4. 查看控制台错误信息
