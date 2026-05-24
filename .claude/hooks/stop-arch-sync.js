#!/usr/bin/env node
/**
 * Stop hook — 對話結束前的最終確認
 *
 * 若本次對話中有架構檔被修改（由 check-arch-sync.js 寫入 .arch-dirty），
 * 提醒 Claude 在結束前確認 CLAUDE.md 是否已同步完畢。
 */

const fs = require('fs')

const flagPath = '.claude/hooks/.arch-dirty'
if (!fs.existsSync(flagPath)) process.exit(0)

let changed
try {
  changed = fs.readFileSync(flagPath, 'utf8')
    .split('\n')
    .filter(Boolean)
    // 去除重複
    .filter((v, i, a) => a.indexOf(v) === i)
} catch {
  process.exit(0)
}

if (changed.length === 0) process.exit(0)

// 清除 flag，避免下次對話誤觸發
fs.unlinkSync(flagPath)

const fileList = changed.map(f => `  • ${f.split('/').pop()}`).join('\n')

process.stdout.write(
  `[arch-sync] 本次對話修改了以下架構檔案：\n${fileList}\n` +
  `請確認 CLAUDE.md 的「Project: Monthly Report」章節已同步更新。\n` +
  `若尚未更新，請在結束前執行同步。\n`
)

process.exit(0)
