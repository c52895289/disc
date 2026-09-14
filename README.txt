# DISC 增員攻心術｜GitHub Pages 互動網站

這是一個純 HTML + CSS + JavaScript 的靜態網站，不需要 Node.js、不需要安裝套件。

## 檔案結構

```text
DISC_Tiger_Interactive_Web/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ script.js
├─ assets/
│  ├─ home.png
│  ├─ tiger.png
│  ├─ clues.png
│  ├─ mines.png
│  └─ mission.png
└─ audio/
   └─ bgm.mp3   ← 可自行放入；沒有也能使用
```

## 本版已完成

- 首頁 → D型老虎攻略
- D型老虎攻略 → 線索辨識／地雷區／任務解鎖
- 各頁返回上一層
- 首頁返回
- 手機／平板／電腦 RWD
- 點擊縮放、Hover 浮起、亮度效果
- 頁面淡入轉場
- 音樂開關（需自行放入 `audio/bgm.mp3`）
- URL hash 導覽，例如 `#tigerPage`

## 如果要換圖片

請把圖片放在 `assets` 資料夾，並維持檔名：
- home.png
- tiger.png
- clues.png
- mines.png
- mission.png

若要換成其他檔名，請同步修改 `index.html` 的 `src="assets/..."`。

## 如果要換背景音樂

把 MP3 命名為：

`bgm.mp3`

放到：

`audio/bgm.mp3`

手機瀏覽器不會被強制自動播放；使用者點「♫ 音樂：關」後才會開始播放。

## GitHub Pages 部署

1. 登入 GitHub。
2. 建立新的 Repository，例如 `disc-tiger-web`。
3. 把這個資料夾裡的「所有檔案」上傳到 Repository 根目錄。
4. GitHub Repository → Settings → Pages。
5. Source 選 `Deploy from a branch`。
6. Branch 選 `main`，資料夾選 `/ (root)`。
7. 按 Save。
8. 等待 GitHub Pages 建置完成。
9. 網址通常會是：
   `https://你的GitHub帳號.github.io/disc-tiger-web/`

## 重要：圖片熱區

目前真正可點擊的區域是 HTML 透明按鈕，不是把圖片切成很多份。

因此圖片縮放時，點擊區域會跟著比例縮放，適合手機／平板／電腦。

如果你未來要調整某個按鈕的位置，修改：

`css/style.css`

裡面的：
- `.tiger-hotspot`
- `.tiger-clues`
- `.tiger-mines`
- `.tiger-mission`
- `.back-home`
- `.back-tiger`

即可。

例如：

```css
.tiger-clues{
  left:2%;
  top:30%;
  width:96%;
  height:22%;
}
```

數字都是百分比，不需要處理不同螢幕解析度。
