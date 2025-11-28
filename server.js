const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 从文件加载 prompt 模板
function loadPrompts() {
  const promptsDir = path.join(__dirname, 'prompts');
  const stylePrompts = {};
  
  const promptFiles = {
    political: 'political.txt',
    internet: 'internet.txt',
    koizumi: 'koizumi.txt',
    business: 'business.txt',
    political_reverse: 'political_reverse.txt',
    internet_reverse: 'internet_reverse.txt',
    koizumi_reverse: 'koizumi_reverse.txt',
    business_reverse: 'business_reverse.txt'
  };

  for (const [style, filename] of Object.entries(promptFiles)) {
    const filePath = path.join(promptsDir, filename);
    try {
      stylePrompts[style] = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Failed to load prompt file for ${style}:`, error);
    }
  }

  return stylePrompts;
}

const stylePrompts = loadPrompts();

app.post('/api/translate', async (req, res) => {
  try {
    const { text, style, reverse } = req.body;

    if (!text || !style) {
      return res.status(400).json({ error: '请提供文字和风格' });
    }

    // 如果是反向模式，使用 _reverse 后缀的 prompt
    const promptKey = reverse ? `${style}_reverse` : style;
    const prompt = stylePrompts[promptKey];
    
    if (!prompt) {
      return res.status(400).json({ error: '不支持的风格类型' });
    }

    console.log(`[OpenAI] 开始转换 - 风格: ${style}, 反向模式: ${reverse ? '是' : '否'}`);
    console.log(`[OpenAI] 输入文本: ${text.substring(0, 50)}...`);
    
    console.log('[OpenAI] 正在向 GPT-4o-mini 模型发送请求...');
    const startTime = Date.now();
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text }
      ],
    });
    
    const translatedText = completion.choices[0].message.content;
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`[OpenAI] 转换完成 - 耗时: ${duration}ms`);
    console.log(`[OpenAI] 输出文本: ${translatedText.substring(0, 50)}...`);

    res.json({ result: translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: '转换失败，请稍后重试' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
