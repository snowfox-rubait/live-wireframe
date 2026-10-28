# 📐 LiveWire — Interactive Wireframing Studio

A modern, fast, zero-dependency interactive wireframing web application designed to create, preview, and iterate on live wireframes.

Inspired by clean technical documentation layouts (like the SimpleArch bootloader wireframe), **LiveWire** lets you freely move, resize, place, spawn, delete, and live-edit wireframe placeholders in real time.

---

## ✨ Features

### 🎯 Freeform Moving, Placing & Layout Modes
- **↕️ Vertical Canvas Height Drag Resizer**:
  - Click and drag down the **bottom resizer handle** or the canvas's bottom edge to expand the canvas vertically to any length!
  - Real-time height readout: displays live height (e.g. `1850px`).
  - **`+400px` Quick Button**: Instant 1-click height expansion.
  - **`Fit Content` Button**: Automatically shrinks or expands the canvas height to cleanly fit all elements.
  - Remembers and restores your custom canvas height across browser refreshes!
- **🎯 Freeform Board Mode**:
  - Drag and place any element **anywhere on the canvas** with free absolute (X, Y) coordinates.
  - Drag elements directly by their body, the **⠿ Move** handle, or floating toolbar.
  - **Drop from sidebar anywhere**: Drag any component from the sidebar and drop it onto the exact canvas coordinates.
  - **Double-click to Place**: Double-click on any empty canvas area to open the spawner and place an element right at your cursor.
  - **🧲 20px Grid Snapping**: Toggle snap-to-grid on/off for pixel-perfect alignment.
- **📄 Document Flow Mode**:
  - Structured responsive document flow (matching the SimpleArch tutorial screenshot).
  - Drag & drop reordering between blocks.
  - Quick Width Adjusters (`25%`, `33%`, `50%`, `100%`) allowing multiple elements to sit side-by-side or stack.

### 📐 Interactive Resizing (Width & Height)
- **8-Way Interactive Resize Handles**:
  - Whenever an element is selected, resize handles appear on all edges and corners (`E`, `S`, `SE`, `W`, `N`, `NW`, `NE`, `SW`).
  - Click and drag handles to dynamically adjust width and height in real time with live dimension tooltips (`W: ...px × H: ...px`).
- **Direct Image Placeholder Resizer (`⤡`)**:
  - Drag the bottom-right corner of any dashed screenshot/media box to freely resize its height and width.
- **Quick Width Buttons**:
  - `25%`, `33%`, `50%`, `100%` width presets on the floating action bar.

### ➕ Spawning & 🗑️ Deleting Elements
- **Spawning**:
  - Click the **`+`** button on any of the 24 library components in the sidebar.
  - Drag & drop components from the palette directly onto the canvas.
  - Double-click anywhere on the canvas to place at cursor.
  - Click **"Add New Element Here"** or **"+" Insert Below**.
- **Deleting**:
  - Click the **🗑 Delete** button on the element's top-right corner badge.
  - Click the **🗑 Delete** button on the floating toolbar.
  - Press <kbd>Delete</kbd> or <kbd>Backspace</kbd> on your keyboard.
- **Duplicating**:
  - 1-click clone via the **❐ Duplicate** button.

### 🖼️ Screenshot Match (SimpleArch Bootloader Guide)
- Top menu bar with editable brand and navigation links
- Breadcrumbs (`Guide > Bootloader`)
- Interactive 8-step progress dash bar (click any dash to toggle active/inactive)
- Bold H1 title + descriptive subtitle
- Two-column feature blocks with dashed media placeholders (`[ screenshot: bootloader menu ]`, `[ GIF: Plymouth boot splash ]`)
- Amber warning sign callout (`⚠ Callout placeholder...`)
- Before & After side-by-side comparison cards
- Bottom pagination navigation (`← Back: Swap` & `Next: Kernel →`)

---

## 🚀 How to Run

### Local Web Server
```bash
python3 /home/test/Work/live-wireframe/server.py 3333
```
Open **`http://localhost:3333`** in your browser.

### Direct Browser Opening
```bash
firefox /home/test/Work/live-wireframe/index.html &
```
