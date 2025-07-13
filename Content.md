Hey guys, thought I would share my workflow and the tools I use working as a full-stack developer. I have tried a lot of tools with the AI boom and have finally settled on these three. A Disclaimer: This may not be objectively the best way to do things, but I am sharing what has worked for me. 

# Tools I Use

**IDE**: [*Cursor*](https://cursor.com/) (Free) -> Mainly used for hand-typing code and utilizing autocomplete. It provides a fast and familiar workspace, which is why I stick with it. 

**AI Agent**: [*Claude Code*](https://www.anthropic.com/claude-code) ($20/m) -> This is where most of my time is spent. Claude Code has given me the best results for code generation, hence why I use it. I am not a huge fan of CLI based tools though, however claude code is just too good to pass up. 

**Planning**: [*Traycer*](https://traycer.ai/) ($10/m) -> I create a blueprint of sorts for my changes with traycer before generating code with claude. In my personal experience if I plan before I generate code, it results in better generation. 

# How I Work

1. **Get the Task** – Describe what needs to be done. 
2. **Plan in Traycer** – Let it outline files, modules, and edge cases. Adjust if needed.
3. **Code with Claude Code** – Give Claude the Traycer plan. Allow it to do its thing. 
4. **Review in Cursor** – Open the repo, press Tab-Tab for fixes, If something big is wrong, go back to Traycer and Claude.

That's it. Simple loop, fewer surprises. Let me know if you have ideas to make it tighter.