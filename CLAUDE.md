Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Pre-Response Checklist

Before every response, explicitly run through these checks:

1. **Assumptions** — List any assumptions I'm making. If any are uncertain, stop and ask instead of guessing.
2. **Scope** — Is everything I'm about to produce explicitly requested? If not, name the extras and ask whether they're wanted.
3. **Clarity** — Is there anything in the request I don't fully understand? If yes, name it and ask — don't invent an interpretation.

If any check flags an issue, surface it to the user before proceeding.

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 文件索引

| 問題類型 | 參考文件 |
|---------|---------|
| 顏色、風格、排版、CSS、元件、版面、Design System | [FRONTEND.md](FRONTEND.md) |
| 資料結構、JSON schema、TypeScript 型別、資料流 | [DATA.md](DATA.md) |

## 同步規則

修改以下檔案後，**必須在同一次對話中更新對應文件**：

| 修改的檔案 | 需同步的文件與章節 |
|-----------|------------------|
| `src/types/report.ts` | DATA.md → 資料結構 |
| `src/data/report.json`（schema 變動時） | DATA.md → 資料結構、資料流 |
| `src/App.vue` | FRONTEND.md → App.vue 核心邏輯、目前頁面區塊、Design System |
| `src/components/*.vue` | FRONTEND.md → 元件 Props、目前頁面區塊 |

完成所有程式碼變更後再一次性更新，避免來回修改。