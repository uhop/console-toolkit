---
description: Update AI-facing documentation files after API or architecture changes
---

# AI Documentation Update

Update all AI-facing files after changes to the public API, modules, or project structure.

## Steps

1. Read `AGENTS.md` and `ARCHITECTURE.md` for current state.
2. Identify what changed (new modules, renamed exports, removed features, etc.).
3. Update `llms.txt`:
   - Ensure module descriptions match the current public API.
   - Keep it concise — this is for quick LLM consumption.
4. Update `llms-full.txt`:
   - Full reference with all modules, options, and examples.
5. Update `ARCHITECTURE.md` if project structure or module dependencies changed.
6. Update `AGENTS.md` if critical rules, commands, or architecture quick reference changed.
7. If `AGENTS.md` changed, run `/sync-ai-rules` to propagate to `.windsurfrules`, `.cursorrules`, `.clinerules`.
8. Update `wiki/Home.md` if the overview needs to reflect new features.
9. Track progress with the todo list and provide a summary when done.
