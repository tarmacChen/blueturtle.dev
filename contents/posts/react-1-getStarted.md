---


title: Learning React - 建立新項目 (1)
author: tarmac
type: post
category: React
description: ''
tags:
  - 'React'
  - 'Create React App'
  - 'Vite'
  - 'Next.js'
keywords:
  - ''
cover: ''
coverFigure: ''
draft: false
createdTime: '2024-04-18T02:24:23.181Z'
---

# {{ title }}

## 為什麼需要用腳手架建立項目

現代網頁應用程式已經不再只是透過引用幾個簡單的 HTML、JavaScript、CSS 檔案組合起來就能完成，雖然網頁技術的底層還是這些東西沒有改變，但作為運行應用程式最常見的客戶端(瀏覽器)目前還是只看得懂這三樣東西，實務上我們不會單純用這三樣東西開發應用程式，可能還會用上 TypeScript、Tailwind CSS、ECMAScript 這些新技術，網頁檔案在丟給瀏覽器工作之前還要先做像是編譯、轉譯、打包等等的前置作業，才能讓瀏覽器正常執行渲染畫面

如果要從頭建立一個新的 React 項目要先自行安裝必要的相依套件、調整初始設定，並且要在每次修改代碼完自行處理先前提到的前置作業，才能讓這些零件運轉起來在瀏覽器上看到執行結果，為了增加開發效率減少這些瑣碎的事情通常會透過俗稱腳手架 (scaffold) 的工具來協助建立新項目，常見的腳手架有 Create React App、Vite、Next.js，本文會聚焦在介紹這三種腳手架工具

> 無論使用哪一種腳手架來建項目都要記得啟動前要先手動執行`npm install`把相依套件安裝好才可以用`npm run dev`啟動項目
>
> 這是一個常見的做法因為`node_modules`的佔用空間及檔案數量太驚人了，把項目的相依性套件相關資訊寫在`package.json`裡面追蹤後續異動，只在開發期間安裝相關套件到工作目錄中，生產階段會透過建置工具將必要的套件拆分打包壓縮放到生產代碼中

## Create React App (CRA)

作為早期最普遍使用的 React 建置工具雖然現在已經沒落了，但還是能在很多教程內容中看見它的身影，因為啟動開發服務器緩慢、打包生產代碼緩慢，整個開發體驗不及其他後起之秀，如果有舊項目要維護或有遷移建置工具的需求才會用到，現在已不建議從 CRA 開始用起，建議用 Vite 或 Next.js 取代

### 安裝

```bash
// 如果先前在全域環境有安裝過套件建議先將舊版本移除掉再用 'npx' 進行安裝，避免安裝到舊版本
npm uninstall -g create-react-app
```

```bash
npx create-react-app cra
```

###  package.json

```json
{
  "name": "cra",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 啟動項目

```bash
npm run start
Compiled successfully!

You can now view cra in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://172.20.10.2:3001

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

![cra-start](/public/img/cra-start.png)

> 整個執行安裝的時間可能長達數分鐘之久，這是正常的情況

## Vite

Vite 是次世代的前端項目建置工具，作者為 Evan You (Vue.js 的作者)，擁有以下特點

- 快速啟動開發服務器 dev server
- 原生 ESM 支持
- 熱模組加載 Hot Module Reload (HMR)
- 透過 Plugin 擴充功能
- 用 Rollup 打包生產代碼

因為 Vite 擁有這些優勢讓它的開發者體驗明顯優於其他建置工具，如果有用過 CRA 或自行用 Webpack 處理的前端開發者應該能夠理解每次修改完代碼要等待一段時間才能在瀏覽器上看到更新結果的痛點

### 安裝

```bash
npm create vite@latest
```

隨後會跳出 prompt 請你輸入 package 名稱及要使用的 framework，然後完成建立

```bash
npm create vite@latest
✔ Project name: … vite-project
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC

Scaffolding project in /Users/tarmac/Projects/vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

### package.json

```json
{
  "name": "react-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```

### 啟動項目

Vite 執行時會找到根目錄的 `vite.config.ts` 檔案根據設定去執行建置工作

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

執行`npm run dev`後 Vite 會快速啟動一個 `dev server` 將項目部署在上面運行

```bash
npm run dev
$ vite

  VITE v5.2.9  ready in 429 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

![vite-start](/public/img/vite-start.png)

## Next.js

Next.js 不算是單純的腳手架工具，它是基於 React 打造的全端開發框架，React 官方已經將它寫進文檔裡推薦開發者用 Next.js 建立新項目

Next.js 提供了多樣的網頁渲染方式

- Client-Side-Rendering (CSR) 客戶端渲染
- Server-Side-Rendering (SSR) 服務器端渲染
- Static-Site-Generator (SSG) 靜態網站生成

### 安裝

```bash
npx create-next-app@latest
```

隨後會跳出一些 prompt 確認項目的偏好設定，然後完成建立

```bash
npx create-next-app@latest
Need to install the following packages:
create-next-app@14.2.2
Ok to proceed? (y) y
✔ What is your project named? … my-app
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
Creating a new Next.js app in /Users/tarmac/Projects/nextjsapp.
```

### package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.2"
  }
}

```

### 啟動項目

```bash
npm run dev
$ next dev
 ⚠ Port 3000 is in use, trying 3001 instead.
  ▲ Next.js 14.2.2
  - Local:        http://localhost:3001
```

![nextjs-start](/public/img/nextjs-start.png)