#!/usr/bin/env node
/**
 * PostToolUse hook — 架構同步提醒
 *
 * 當 Edit / Write 工具修改到架構相關檔案時，
 * 輸出提醒訊息，告知 Claude 需要更新 CLAUDE.md 的哪些章節。
 */

const fs = require('fs')

let raw
try {
  raw = fs.readFileSync(0, 'utf8')
} catch {
  process.exit(0)
}

let event
try {
  event = JSON.parse(raw)
} catch {
  process.exit(0)
}

const filePath = (event.tool_input?.file_path || '').replace(/\\/g, '/')

// 每個架構檔對應到 CLAUDE.md 中需要更新的章節
const ARCH_RULES = [
  {
    pattern: 'src/types/report.ts',
    sections: ['資料結構（schema、介面定義）', '元件 Props 表格'],
  },
  {
    pattern: 'src/App.vue',
    sections: ['App.vue 核心邏輯', '五個章節對照表', 'Design System（CSS Variables）'],
  },
  {
    pattern: 'src/components/',
    sections: ['元件 Props 表格', '五個章節對照表'],
  },
]

const matched = ARCH_RULES.find(r => filePath.includes(r.pattern))
if (!matched) process.exit(0)

const fileName = filePath.split('/').pop()
const sectionList = matched.sections.map(s => `  • ${s}`).join('\n')

process.stdout.write(
  `[arch-sync] 架構檔案已修改：${fileName}\n` +
  `完成所有變更後，請同步更新 CLAUDE.md 的以下章節：\n${sectionList}\n`
)

// 寫入 dirty flag，供 Stop hook 使用
const flag = `${filePath}\n`
fs.appendFileSync('.claude/hooks/.arch-dirty', flag)

process.exit(0)
