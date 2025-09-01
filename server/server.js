const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 13691;

// 中间件设置
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // 静态文件服务

// 统计文件路径
const STATS_FILE_PATH = path.join(__dirname, '../count/地下城统计新.txt');

// 判断是否为妖精类型物品（排除猫珠和崩坏）
function isFairyItem(itemName) {
    const fairyItems = ['普通妖精', '银色妖精', '金色妖精', '宝石妖精'];
    return fairyItems.includes(itemName);
}

// 根据行数获取对应的副本名称
function getDungeonName(line) {
    const dungeonMap = {
        'line1': '猫本',
        'line2': '困高', 
        'line3': '塔本'
    };
    return dungeonMap[line];
}

// 增加副本次数
function incrementDungeonCount(stats, line, amount) {
    const dungeonName = getDungeonName(line);
    if (dungeonName && stats[line]) {
        if (!stats[line][dungeonName]) {
            stats[line][dungeonName] = 0;
        }
        stats[line][dungeonName] += amount;
    }
}

// 减少副本次数
function decrementDungeonCount(stats, line, amount) {
    const dungeonName = getDungeonName(line);
    if (dungeonName && stats[line] && stats[line][dungeonName]) {
        stats[line][dungeonName] = Math.max(0, stats[line][dungeonName] - amount);
    }
}

// 解析统计文件内容
function parseStatsFile() {
    try {
        const content = fs.readFileSync(STATS_FILE_PATH, 'utf8');
        const lines = content.trim().split('\n');
        
        const stats = {};
        
        lines.forEach((line, index) => {
            // 解析每一行的数据
            const matches = line.match(/(\S+)：(\d+)/g);
            if (matches) {
                const lineData = {};
                matches.forEach(match => {
                    const [name, value] = match.split('：');
                    lineData[name] = parseInt(value);
                });
                stats[`line${index + 1}`] = lineData;
            }
        });
        
        return stats;
    } catch (error) {
        console.error('读取统计文件失败:', error);
        return {};
    }
}

// 保存统计数据到文件
function saveStatsFile(stats) {
    try {
        let content = '';
        
        // 重新构建文件内容
        Object.keys(stats).forEach(lineKey => {
            const lineData = stats[lineKey];
            const lineContent = Object.entries(lineData)
                .map(([name, value]) => `${name}：${value}`)
                .join('     ');
            content += lineContent + '\n';
        });
        
        // 去掉最后一个换行符
        content = content.trim();
        
        fs.writeFileSync(STATS_FILE_PATH, content, 'utf8');
        return true;
    } catch (error) {
        console.error('保存统计文件失败:', error);
        return false;
    }
}

// API 路由

// 获取当前统计数据
app.get('/api/stats', (req, res) => {
    const stats = parseStatsFile();
    res.json({ success: true, data: stats });
});

// 更新统计数据
app.post('/api/stats/update', (req, res) => {
    const { line, item, value } = req.body;
    
    if (!line || !item || value === undefined) {
        return res.status(400).json({ 
            success: false, 
            message: '参数缺失：需要line, item, value' 
        });
    }
    
    const stats = parseStatsFile();
    
    if (!stats[line]) {
        stats[line] = {};
    }
    
    stats[line][item] = parseInt(value);
    
    if (saveStatsFile(stats)) {
        res.json({ success: true, message: '更新成功', data: stats });
    } else {
        res.status(500).json({ success: false, message: '保存失败' });
    }
});

// 增加数值
app.post('/api/stats/increment', (req, res) => {
    const { line, item, amount = 1 } = req.body;
    
    if (!line || !item) {
        return res.status(400).json({ 
            success: false, 
            message: '参数缺失：需要line, item' 
        });
    }
    
    const stats = parseStatsFile();
    
    if (!stats[line]) {
        stats[line] = {};
    }
    
    if (!stats[line][item]) {
        stats[line][item] = 0;
    }
    
    stats[line][item] += parseInt(amount);
    
    // 妖精增加时自动增加副本次数的联动逻辑
    if (isFairyItem(item)) {
        incrementDungeonCount(stats, line, parseInt(amount));
    }
    
    if (saveStatsFile(stats)) {
        res.json({ success: true, message: '增加成功', data: stats });
    } else {
        res.status(500).json({ success: false, message: '保存失败' });
    }
});

// 减少数值
app.post('/api/stats/decrement', (req, res) => {
    const { line, item, amount = 1 } = req.body;
    
    if (!line || !item) {
        return res.status(400).json({ 
            success: false, 
            message: '参数缺失：需要line, item' 
        });
    }
    
    const stats = parseStatsFile();
    
    if (!stats[line]) {
        stats[line] = {};
    }
    
    if (!stats[line][item]) {
        stats[line][item] = 0;
    }
    
    const oldValue = stats[line][item];
    stats[line][item] = Math.max(0, stats[line][item] - parseInt(amount));
    const actualDecrement = oldValue - stats[line][item];
    
    // 妖精减少时自动减少副本次数的联动逻辑
    if (isFairyItem(item) && actualDecrement > 0) {
        decrementDungeonCount(stats, line, actualDecrement);
    }
    
    if (saveStatsFile(stats)) {
        res.json({ success: true, message: '减少成功', data: stats });
    } else {
        res.status(500).json({ success: false, message: '保存失败' });
    }
});

// 重置统计数据
app.post('/api/stats/reset', (req, res) => {
    const { line, item } = req.body;
    
    const stats = parseStatsFile();
    
    if (line && item) {
        // 重置特定项目
        if (stats[line] && stats[line][item] !== undefined) {
            stats[line][item] = 0;
        }
    } else if (line) {
        // 重置整行
        if (stats[line]) {
            Object.keys(stats[line]).forEach(key => {
                stats[line][key] = 0;
            });
        }
    } else {
        // 重置所有
        Object.keys(stats).forEach(lineKey => {
            Object.keys(stats[lineKey]).forEach(itemKey => {
                stats[lineKey][itemKey] = 0;
            });
        });
    }
    
    if (saveStatsFile(stats)) {
        res.json({ success: true, message: '重置成功', data: stats });
    } else {
        res.status(500).json({ success: false, message: '保存失败' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`统计管理服务器运行在 http://localhost:${PORT}`);
    console.log(`管理界面: http://localhost:${PORT}`);
    console.log(`端口 ${PORT} 已启用，这是一个安全的非标准端口`);
});
