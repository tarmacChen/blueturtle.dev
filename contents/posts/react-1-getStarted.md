---
title: Learning React - 建立新專案 (1)
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
draft: true
createdTime: '2024-04-18T02:24:23.181Z'
---

# {{ title }}

## 為什麼要用腳手架建立新項目

現代的網頁應用程式已經不再是透過引用幾個簡單的 HTML、JavaScript、CSS 檔案就能完成，雖然應用程式的底層還是這些東西沒有改變，但時至今日作為運行網頁應用程式最常見的客戶端 - 瀏覽器，目前還是只看得懂這三樣東西，為了能夠在瀏覽器上正常運作，還需要做打包、編譯、轉譯等等的工作，最終才能將正確的結果渲染在瀏覽器上

如果要從頭建立一個全新的 React App 項目會需要做很多前置作業，像是安裝必要的相依套件、初始化設定等等，才能讓這些套件運作正常流暢啟動，開發技術如果有用到 TypeScript、SASS、ECMAScript 這些東西還先用 tsc、PostCSS、Babel 這些工具處理才能讓瀏覽器正常渲然執行，為了簡化開發流程增加效率通常會使用腳手架來協助快速建立新專案，之後將這些瑣碎事情交給它代為處理，常見的工具有 Create React App、Vite、Next.js 這篇文章會初步介紹如何使用

## Create React App ( CRA )

作為早期最普遍使用的工具雖然現在已經沒落了，但還是能在很多教程內容中看見這套工具的身影，`CRA` 因為用 `Webpack` 進行打包且缺少 Hot Module Reload (`HMR`) 功能，每次改完代碼要重新 build 的速度很慢，整個開發體驗遠不及其他後起之秀，整體的使用難度不大若有舊項目要維護或有改用其他建置工具的打算，再查看官方文檔學習也不遲

```shell
// 如果先前有在全域環境安裝過 'Create React App' 建議先將舊版本移除掉再用 'npx' 執行套件建立專案，避免用到舊版本的套件
npm uninstall -g create-react-app

// 建立 React App
npx create-react-app my-app
```

## Vite

```shell
npm create vite@latest
```

> 執行後會跳出 prompt 請你輸入新的 package 名稱及要使用的 framework，然後產生一個擁有以下內容的 package.json 檔案，完成項目資料夾的建立

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

> 啟動項目前記得要先手動執行`npm install`把相依套件安裝好才可以透過`npm run dev`啟動項目

> 這是一個常見的做法因為`node_modules`的佔用空間及檔案數量太驚人了，把相依性套件有關的資訊紀錄在`package.json`裡面來追蹤異動，只在必要的時候安裝套件

執行建置工作時 Vite 會根據專案根目錄裡的 `vite.config.ts` 設定去建置任務

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```
