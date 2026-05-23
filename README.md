# Geometry Dash Web Launcher

A premium web-based launcher and player for **Geometry Dash** levels. This project runs a WebGL port of the game and features a fully enhanced selection menu where you can play official levels, load custom levels by ID, and browse/play rankings directly from the Web Browser Demonlist (WBDL).

---

## 🚀 Features

- **🎮 Full WebGL Game Engine:** Play Geometry Dash directly in your browser with optimized performance.
- **🏆 Interactive WBDL (Web Browser Demonlist):** Browse the top hardest levels beaten in the browser version. Real-time rankings are fetched from the WBDL API, complete with direct play buttons and YouTube showcase video links.
- **🔍 Advanced Level Filtering:** 
  - Search levels instantly by name or creator.
  - Filter levels by difficulty (Easy, Normal, Hard, Harder, Insane, Demon).
- **🎵 Retro Audio Experience:** Toggleable background menu music (*Back on Track*) with volume memory (`localStorage`) and authentic in-game click sound effects.
- **🎨 Custom GD Modals:** Custom, beautifully themed dialog windows for entering level IDs and custom configurations instead of generic browser prompt boxes.
- **✨ Classic Menu Particles:** An HTML5 `<canvas>` background rendering rotating, drifting retro square particles that mimic the original game's visual style.
- **🛡️ Protocol Guard:** Detects browser origin limitations (like opening the file via `file://`) and shows clear, helpful instructions on how to set up a local server.

---

## 🛠️ How to Run Locally

Because the game engine relies on a **Service Worker** to intercept and inject level data (`1.txt`) and custom music (`.mp3`), **you cannot run this project by double-clicking the HTML file (`file://`)**. Browsers block Service Workers on file-based origins for security.

You must serve the directory over **HTTP/HTTPS**. Here are the easiest ways to do it:

### Option 1: Using Node.js (Recommended)
If you have [Node.js](https://nodejs.org/) installed:
1. Open your terminal in the project directory.
2. Run the following command:
   ```bash
   npx http-server
   ```
3. Open the URL provided (usually `http://127.0.0.1:8080`) in your web browser.

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Click the **Go Live** button at the bottom-right corner of the editor.

---

## ⚙️ Technical Architecture

### Stateless Service Worker Interception (`worker.js`)
To avoid race conditions and state loss when the browser terminates the background Service Worker thread, the launcher uses a **stateless parameter extraction architecture**:
1. When the game engine requests level resources (`1.txt` or `StereoMadness.mp3`), the request is intercepted.
2. The Service Worker parses the **HTTP Referer** header of the request to read the query parameters (`?id=...` or `?string=...`).
3. It fetches the required assets:
   - For official levels (negative IDs), it loads local assets from `game/assets/`.
   - For custom level IDs (positive IDs), it dynamically proxies level data and music from custom Cloudflare Workers (`lasokar.workers.dev`).
   - For imported level strings, it generates text/plain mock responses.
4. Auto-client claiming (`self.clients.claim()`) and controller-readiness checks ensure that the client is fully controlled on its first load.

---

## 👥 Credits

- **Original Game:** [RobTop Games](https://www.robtopgames.com/)
- **Web Export & Workers:** [Lasokar](https://github.com/lasokar)
- **Menu Enhancements (Search, Filters, Audio, Modals, Particles, WBDL Integration):** [Alberto2005-coder](https://github.com/alberto2005-coder)
