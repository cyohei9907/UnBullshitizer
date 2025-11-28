document.addEventListener('DOMContentLoaded', () => {
  const styleBtns = document.querySelectorAll('.style-btn');
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const submitBtn = document.getElementById('submit');
  const title = document.getElementById('title');
  const copyBtn = document.getElementById('copyBtn');

  let selectedStyle = null;
  let reverseMode = false;
  let clickCount = 0;
  let clickTimer = null;

  // 样例数据
  const examples = {
    political: {
      normal: '我们今天必须把这个小程序上线，不然老板要生气了。',
      jargon: '我们要深入贯彻落实上级领导的重要指示精神，切实提高政治站位，以高度的责任感和使命感，确保在既定时间节点前完成小程序上线工作的闭环管理，为领导决策提供有力支撑。'
    },
    internet: {
      normal: '这个功能好像没什么用，要不先不要做？',
      jargon: '从产品价值链路来看，该功能模块的ROI存在一定挑战，建议我们先做个优先级排序，把资源聚焦在核心场景的打磨上，这个可以放到backlog里，等后续业务跑通了再来复盘是否要做二期迭代。'
    },
    business: {
      normal: '我们今天必须把这个小程序上线，不然老板要生气了。',
      jargon: '今天我们需要对小程序的版本迭代进行快速闭环，确保在节点前完成上线动作，避免影响管理层的预期对齐。'
    },
    koizumi: {
      normal: '这件事很重要，我们要认真对待。',
      jargon: '这件事之所以重要，正是因为它具有重要性。我们要认真对待重要的事情，因为重要的事情需要被认真对待。什么是认真对待？认真对待就是以认真的态度去对待。'
    }
  };

  // 双击标题切换模式
  title.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);
    } else if (clickCount === 2) {
      clearTimeout(clickTimer);
      clickCount = 0;
      
      // 切换模式
      reverseMode = !reverseMode;
      
      if (reverseMode) {
        title.textContent = '说人话';
        title.style.color = '#2563eb';
        document.querySelectorAll('.label').forEach(label => {
          if (label.textContent === '输入文字') {
            label.textContent = '输入黑话';
          } else if (label.textContent === '转换结果') {
            label.textContent = '人话结果';
          }
        });
        input.placeholder = '在此输入各种黑话...';
        output.textContent = '人话将显示在这里';
        
        // 如果有选中的风格，更新样例
        if (selectedStyle && examples[selectedStyle]) {
          input.value = examples[selectedStyle].jargon;
          output.textContent = examples[selectedStyle].normal;
          output.classList.remove('empty');
          copyBtn.classList.add('show');
        }
      } else {
        title.textContent = '不说人话';
        title.style.color = '#333';
        document.querySelectorAll('.label').forEach(label => {
          if (label.textContent === '输入黑话') {
            label.textContent = '输入文字';
          } else if (label.textContent === '人话结果') {
            label.textContent = '转换结果';
          }
        });
        input.placeholder = '在此输入要转换的文字...';
        output.textContent = '转换后的文字将显示在这里';
        
        // 如果有选中的风格，更新样例
        if (selectedStyle && examples[selectedStyle]) {
          input.value = examples[selectedStyle].normal;
          output.textContent = examples[selectedStyle].jargon;
          output.classList.remove('empty');
          copyBtn.classList.add('show');
        }
      }
      
      // 显示提示
      const toast = document.createElement('div');
      toast.textContent = reverseMode ? '已切换到"说人话"模式' : '已切换到"不说人话"模式';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  });

  styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      styleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedStyle = btn.dataset.style;
      
      // 显示对应的样例
      if (examples[selectedStyle]) {
        if (reverseMode) {
          // 反向模式：输入黑话，输出人话
          input.value = examples[selectedStyle].jargon;
          output.textContent = examples[selectedStyle].normal;
        } else {
          // 正向模式：输入正常话，输出黑话
          input.value = examples[selectedStyle].normal;
          output.textContent = examples[selectedStyle].jargon;
        }
        output.classList.remove('empty');
        copyBtn.classList.add('show');
      }
    });
  });

  submitBtn.addEventListener('click', async () => {
    const text = input.value.trim();

    if (!selectedStyle) {
      alert('请选择一个风格');
      return;
    }

    if (!text) {
      alert('请输入要转换的文字');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = '转换中...';
    output.textContent = '正在转换...';
    output.classList.add('empty');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          text, 
          style: selectedStyle,
          reverse: reverseMode
        })
      });

      const data = await response.json();

      if (response.ok) {
        output.textContent = data.result;
        output.classList.remove('empty');
        copyBtn.classList.add('show');
      } else {
        output.textContent = data.error || '转换失败';
        output.classList.add('empty');
        copyBtn.classList.remove('show');
      }
    } catch (error) {
      output.textContent = '网络错误，请稍后重试';
      output.classList.add('empty');
      copyBtn.classList.remove('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.textContent = '确认转换';
    }
  });

  // 复制按钮功能
  copyBtn.addEventListener('click', async () => {
    const text = output.textContent;
    
    if (!text || output.classList.contains('empty')) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = '已复制';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = '复制';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (error) {
      console.error('复制失败:', error);
      copyBtn.textContent = '复制失败';
      setTimeout(() => {
        copyBtn.textContent = '复制';
      }, 2000);
    }
  });
});
