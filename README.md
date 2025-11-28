# 不说人话 / Humantic Translate

一个基于 AI 的文字风格转换工具,可以将正常人话转换成各种"黑话"风格,也可以反向将黑话转换回正常人话。

## ✨ 特性

- 🎭 **多种风格转换**
  - 政治开会风格
  - 互联网黑话
  - 商务黑话
  - 小泉构文

- 🔄 **双向转换**
  - 正向:正常人话 → 各种黑话
  - 反向:各种黑话 → 正常人话
  - 双击标题即可切换模式

- 🌍 **多语言支持**
  - 自动识别输入语言
  - 使用相同语言输出结果

- 📋 **一键复制**
  - 转换结果可一键复制到剪贴板

- 💡 **样例展示**
  - 选择风格后自动加载样例
  - 帮助理解转换效果

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- Google Gemini API Key

### 安装

1. 克隆项目
```bash
git clone <repository-url>
cd project023_humantic_translate
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量

创建 `.env` 文件并添加你的 Gemini API Key:
```env
GEMINI_API_KEY=your_api_key_here
PORT=8080
```

### 运行

```bash
npm start
```

访问 http://localhost:8080 即可使用

## 📖 使用说明

### 不说人话模式(默认)

1. 选择一个风格(政治开会/互联网/商务黑话/小泉构文)
2. 输入正常人话
3. 点击"确认转换"
4. 查看转换后的黑话结果
5. 点击"复制"按钮复制结果

### 说人话模式

1. **双击**页面标题"不说人话"
2. 标题变为蓝色"说人话"
3. 选择对应的风格
4. 输入黑话
5. 点击"确认转换"
6. 查看转换回的正常人话

## 🎯 使用示例

### 商务黑话转换

**输入(正常人话):**
```
我们今天必须把这个小程序上线，不然老板要生气了。
```

**输出(商务黑话):**
```
今天我们需要对小程序的版本迭代进行快速闭环，确保在节点前完成上线动作，避免影响管理层的预期对齐。
```

### 互联网黑话转换

**输入(正常人话):**
```
这个功能好像没什么用，要不先不要做？
```

**输出(互联网黑话):**
```
从产品价值链路来看，该功能模块的ROI存在一定挑战，建议我们先做个优先级排序，把资源聚焦在核心场景的打磨上，这个可以放到backlog里，等后续业务跑通了再来复盘是否要做二期迭代。
```

## 🏗️ 项目结构

```
project023_humantic_translate/
├── server.js           # Express 服务器
├── package.json        # 项目配置
├── Dockerfile         # Docker 配置
├── cloudbuild.yaml    # 云构建配置
├── prompts/           # AI Prompt 模板
│   ├── political.txt
│   ├── internet.txt
│   ├── business.txt
│   ├── koizumi.txt
│   ├── political_reverse.txt
│   ├── internet_reverse.txt
│   ├── business_reverse.txt
│   └── koizumi_reverse.txt
└── public/            # 前端文件
    ├── index.html
    └── app.js
```

## 🛠️ 技术栈

- **后端**: Node.js + Express
- **AI**: Google Gemini 2.0 Flash
- **前端**: 原生 HTML/CSS/JavaScript
- **部署**: Docker

## 📝 自定义 Prompt

你可以通过修改 `prompts/` 目录下的文本文件来自定义转换风格:

1. 正向转换: `{style}.txt`
2. 反向转换: `{style}_reverse.txt`

修改后重启服务器即可生效。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 使用 Google Gemini API 提供 AI 能力
- 灵感来源于各种网络梗和"黑话"文化

## ⚠️ 免责声明

本项目仅供娱乐和学习交流使用,请勿用于任何商业或不当用途。转换结果仅为 AI 生成的模拟内容,不代表任何立场或观点。
