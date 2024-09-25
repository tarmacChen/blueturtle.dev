---
title: Next.js - 用Clerk管理多方登入
author: tarmac
type: post
category: draft
description: ''
tags:
  - ''
keywords:
  - ''
cover: ''
coverFigure: ''
draft: true
createdTime: '2024-09-21T08:43:04.795Z'
---

## {{ title }}

[Clerk Official Website]('https://clerk.com/')

### Clerk 是什麼？

Clerk 是一個可以幫助你處理有關 Authentication 跟 User Management 相關問題的 SaaS 服務，套用後只要使用者沒有登入帳號就會跳出像下面這個登入元件讓使用者操作登入動作

![Clerk Login Component](/public/img/clerk-login-component.png)

### 收費方式

Clerk 的收費方式有兩種分別是 `Free Plan`、`Pro Plan` ，兩種方案都提供了 10,000 個月活躍用戶的使用額度，超過基本額度後要訂閱每個月25美金的 `Pro Plan` 方案才能再增加使用額度，超過基本額度後每增加一個月活躍用戶的的使用額度要多收0.02美金的費用，除此之外訂閱 `Pro Plan` 還解鎖了這些功能

- 允許更多的 MAU (Monthly Active User)
- 移除 Clerk Branding
- 設定 Allowlist/Blocklist
- 自定義 Session Duration

Clerk 提供了更多的功能像是

- 多因子認證(SMS, TOTP, )

![Clerk Docs]('https://clerk.com/docs/quickstarts/nextjs')

註冊Clerk帳號後新增Application會拿到一組`API Keys`，把它加到環境變數的檔案裡面，不同的應用程式會有不同的放置位置，以`Next.js`來說是放到`.env.local`這裏

### 安裝

```shell
npm install @clerk/nextjs
```

### 設定環境變數

```ENV
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

.env.local

### 把Middleware加到應用程式

建立 middleware.ts

```js
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

把 middleware.ts 移動到正確的位置

- 如果你是使用`/src`的風格組織檔案，把`middleware.ts`放到`/src`底下
- 如果沒有使用`/src`，把`middleware.ts`放到專案資料夾的根目錄底下(跟`.env.local`同一層)
