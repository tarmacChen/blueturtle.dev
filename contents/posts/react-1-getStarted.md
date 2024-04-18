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

## 組成網頁應用程式的基本三元素

現代的網頁應用程式已經不再是透過引用幾個簡單的 HTML、JavaScript、CSS 檔案就能完成，雖然技術的底層還是這些東西沒有改變，但時至今日作為運行網頁應用程式最常見的客戶端 - 瀏覽器，目前還是只看得懂這三樣東西，為了能夠在瀏覽器上正常運作，還需要做打包、編譯、轉譯等等的工作，最終才能將正確的結果渲染在瀏覽器上

## 透過腳手架建立新專案

如果要從頭建立一個全新的 React App 專案會需要做很多前置作業，像是安裝 package、排除相依性問題、初始化設定等等，才能讓這些套件運作正常流暢啟動，開發技術如果有用到 TypeScript、SASS、ECMAScript 這些東西還先用 tsc、PostCSS、Babel 這些工具處理原始碼才能讓瀏覽器正常渲然執行，為了簡化開發流程增加效率通常會使用工具(腳手架)來協助快速建立新專案，之後將這些瑣碎事情交給工具代為處理，React 常見的腳手架工具有 Create React App、Vite 這篇文章會初步介紹如何使用

### Create React App (CRA)

作為早期最普遍使用的腳手架工具，雖然現在已經沒落了，但還是能在很多 React 教程內容看見這套工具的身影，CRA 用 Webpack 進行打包且缺少 Hot Module Reload (HMR) 功能，每次改完代碼要重新 build 的速度很慢，整個開發體驗遠遠不及其他後起之秀，使用難度不大若有舊項目要維護或是要將舊項目改用其他建置工具維護的打算，再查看官方文檔學習使用即可

只要一行指令就能完成建立

```shell
npx create-react-app my-app
yarn
```

如果先前有在全域環境安裝過 `create-react-app` 建議先將舊版本移除掉再用 npx 執行套件建立專案，避免用到舊版本的套件，用 `npx` 來安裝可以避免此問題

```shell
npm uninstall -g create-react-app
```

[Official Docs](https://create-react-app.dev/docs/getting-started)

### Vite
