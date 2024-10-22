---
title: 從 Hugo 遷移至 Next.js
author: tarmac
category: Next.js
type: post
description: "用Next.js開發個人技術分享網站的紀錄"
tags:
  - "Tech blog"
  - "Hugo"
  - "Next.js"
  - "React"
keywords:
  - ""
draft: false
createdTime: "2024-04-08T07:50:44.733Z"
---

# {{ title }}

## 為什麼要遷移到Next.js

### Next.js是什麼？

Next.js是基於React用來快速構建網頁應用程式的開發框架，透過框架可以選擇用SSG (Static Site Generator)或SSR (Server Side Rendering)的方式渲染網頁應用程式，Next.js可以協助將整個React應用程式的目錄結構規範下來、協助簡化處理路由的細節等等，減輕React開發者的心智負擔。

### 學習React的契機

最近工作上有一個專案需要用現代網頁框架去建立應用程式，因為我沒有任何相關的實作經驗，因此我需要先在React、Angular、Vue這三個主流框架中做選擇從頭開始學起，這是一個全新的專案且沒有技術上的歷史包袱，我私心選了對我未來發展可能最有幫助的React，學習曲線雖然較為陡峭難上手，但使用起來靈活高效只要像拼積木一樣將不同的組件(Component)拼湊在一塊就可以實作出各種功能，React擁有最高的市占率與充沛的社群資源，開發過程中若有遇到什麼問題都可以很快在網路上得到解答。

### 遷移到Next.js的目的

未來我想寫更多有關React技術的文章，遷移到Next.js的目的是希望能夠更方便的在文章中說明程式碼然後呈現執行結果，讓讀者可以很直觀的看到運作原理。

## 選擇Hugo作為SSG的優點

### 構建速度極快

技術分享網站主要是靜態內容呈現不需要跟後端交互，任何一種SSG應該都很適合，現在的主流是用Markdown撰寫文章，這種格式可以讓作者專注在內容本身，其他像排版的問題交給SSG去處理協助渲染成網頁，Hugo相較於其他競品來說最大的優點是構建速度，撰寫Markdown時會希望即時看到渲染完的結果方便進一步做調整，如果網站的文章數量很多而構建速度太慢，會花太多時間在等待構建作業完成，用Hugo的話不用擔心這個問題，整個構建作業在毫秒間就完成，但我目前的文章數量還不足以拿這點來作為取捨SSG的考量重點。

Hugo功能很完整很強大，還有其他優點就不在這篇文章展開來討論，之後如果有寫Hugo的系列文章會再分享介紹。

## 為什麼放棄使用Hugo

### Go Template

```html
{{ define "main" }}
<main aria-role="main">
  <header class="homepage-header">
    <h1>{{ .Title }}</h1>
    {{ with .Params.subtitle }}
    <span class="subtitle">{{ . }}</span>
    {{ end }}
  </header>
  <div class="homepage-content">
    <!-- Note that the content for index.html, as a sort of list page, will pull from content/_index.md -->
    {{ .Content }}
  </div>
  <div>
    {{ range first 10 .Site.RegularPages }} {{ .Render "summary" }} {{ end }}
  </div>
</main>
{{ end }}
```

Hugo用Go內置模板來組織網頁結構渲染內容，如果有用過像是Handlebars、Mustache、EJS的人應該不陌生，Web的發展過程中有流行了一段時間，用模板語言渲染文章內容本身沒什麼太大的問題，但如果模板語言要跟React應用程式混合一起使用就麻煩了，我還打算用上TypeScript，這樣的技術堆疊下來還有編譯、模組打包的問題要處理，每一次調整版型都不知道如何下手，因為Hugo並不是為了解決這類問題去設計的，將網站遷移用別種SSG來維護會是比較好的選擇，後續如果要調整版型或添加新功能維護成本會降低許多。

### 難以擴展新功能

因為Hugo是用Golang寫的，如果有需要的功能是開源社群上找不到的，可能需要捲起袖子自己寫Golang，這就違背了專注在文章內容本身的這件事上，目前沒有打算投入其他時間來學習Golang。

### 趁機練習Next.js及React

將個人技術分享網站遷移到Next.js的選擇，可以讓我拿實際的工作項目練習學到的新技術，將學到的東西寫成文章方便未來回顧且分享給更多人，持續做這件事一定能給我帶來很多收穫讓我飛速成長。
