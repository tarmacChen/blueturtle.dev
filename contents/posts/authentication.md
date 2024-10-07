---
title: "Authentication 身份驗證與密碼保存"
category: posts
author: tarmac
description: ""
tags: [Security, Authentication, Authorization]
createdTime: "2024-01-26T14:37:40+08:00"
draft: false
---

# {{ title }}

## 什麼是 Authentication

Authentication 是用來驗證使用者的身份，最常見的就是帳號密碼登入或是透過憑證、生物辨識等方式確認用戶或訪客的身份，確認對方是否有存取資料的權限。

## Authentication 與 Authorization 的區別

另一個很相似的單字 Authorization 是確認使用者是否擁有使用各個功能的權限，簡單解釋起來就是

| Authentication<br/>(驗證/認證) | Authorization<br/>(授權) |
| ------------------------------ | ------------------------ |
| 你是誰？                       | 你可以做什麼？           |

## 實作 Authentication (帳號密碼登入)

### 不要直接保存使用者的密碼

> 使用者嘗試註冊帳號，帳號密碼分別為 jessica 及 123

| username | password |
| -------- | -------- |
| jessica  | 123      |

直接保存使用者的密碼是一件很危險的事情，一旦選擇幫使用者保存密碼，後續就要做很多機制來防範資料外洩及其他問題，同時讓系統管理者能直接看到客戶的密碼也不是正確的事情，一勞永逸的方法是讓使用者自己記住密碼(私鑰)，永遠不替使用者保存。

如果不保存使用者的密碼那要怎麼確認登入時帳號密碼的正確性呢？

### Password + Salt = Hash

#### Salt

在使用者註冊帳號時產生一組加密文字可以用 base64 或其他編碼方式產生，註冊成功後 Server 協助保存到帳戶資料。

```json
{
  "username": "jessica",
  "salt": "PyihcMvQ"
}
```

#### Hash 雜湊值

接著利用使用者的 salt 與註冊時設定的密碼，計算得到 hash 將其保存在帳戶資料內，用來驗證之後的登入嘗試。

```json
{
  "username": "jessica",
  "salt": "PyihcMvQ",
  "hash": "ea627a"
}
```

#### 確認後續登入密碼是否輸入正確

之後使用者嘗試登入時我們拿輸入的密碼與該帳號擁有的 salt 去做計算，看算出來的 hash 是不是與該帳號保存的 hash 相同，如果完全一致可以將這個結果視為密碼輸入正確成功登入。

#### 記得更新 hash

使用者變更密碼時會利用帳號擁有的 salt 與設定的密碼去算出新的 hash，若密碼變更成功要記得更新資料。

### 記住使用者的登入狀態

使用者成功登入帳號之後，可以加入記住登入狀態的功能提升使用者體驗，才不用在每次重新加載頁面後還要重新登入才能操作。

#### SessionToken

回顧先前註冊帳號時得到的 salt 加上使用者設定的密碼，得到了可以用來驗證密碼的 hash。

```json
{
  "username": "jessica",
  "salt": "PyihcMvQ",
  "hash": "ea627a"
}
```

同樣的，我們可以在每次登入帳號時產生一次性的 salt ，將其與使用者輸入的密碼做計算產生新的 hash，這組 hash 可以用來驗證使用者是否已經登入過，為了避免搞混我們將這種用途的 hash 稱為 sessionToken。

```json
{
  "_salt": "AoiRJckS",
  "username": "jessica",
  "sessionToken": "d23b0f"
}
```

在 Server 與 Client 各保存一份

```json
// Server side

{
  "sessions": [
    {
      "sessionToken": "d23b0f",
      "username": "jessica"
    },
    {
      "sessionToken": "ts0a26",
      "username": "tom"
    }
  ]
}
```

```js
// Client side

// 透過 Cookie 保存 sessionToken
document.cookie = "user_session=d23b0f";

// 透過 LocalStorage 保存 sessionToken
localStorage.setItem("user_session", "d23b0f");
```

當 Server 收到請求時，檢索看有沒有匹配的 sessionToken，如果有則自動登入擁有該 sessionToken 的使用者帳號。

#### 暴力破解依然沒有收穫

使用 hash 這種保存密碼的方式就算在資料外洩的情況下也讓攻擊者很難知道密碼到底是什麼，就算拿到了該帳號的 salt 及 hash 也只能用暴力破解嘗試算出密碼，簡單加上密碼輸入錯誤次數限制的設計就能有效保護帳號遭受暴力破解的攻擊。

### Cookbook

#### 防止使用者無限擁有登入狀態

若在 sessionToken 上加入時效性的機制可以防止擁有該 sessionToken 的使用者無限擁有登入狀態，若不幸 sessionToken 資料外洩了攻擊者也只能在一定的時間內操作該使用者帳號。

#### 通知使用者是否已經在其他裝置登入過、登出其他裝置的登入狀態

Server 只替每個使用者記錄一份 sessionToken ，這種設計可以實作「通知使用者是否已經在其他裝置登入過」的功能，若使用者在不同的裝置登入帳號會讓舊的 sessionToken 紀錄被覆蓋掉間接實現登出其他裝置登入狀態的功能。

### 不正確的處理方式

也許你有看過直接將密碼做一次編碼就保存的方式，這樣的使用者密碼只是經過加密處理過的，攻擊者拿到這串文字就能回推密碼原有的模樣，若熟悉密碼學甚至不需要嘗試破解，光看長度及模樣就能猜出密碼分別是用 base64、MD5、SHA1 處理過的加密文字。

```json
{
  "username": "jessica",
  "password": "MTIz"
  // 使用 base64 解密得到密碼 "123"
}
```

```json
{
  "username": "jessica",
  "password": "202cb962ac59075b964b07152d234b70"
  // 使用 MD5 解密得到密碼 "123"
}
```

```json
{
  "username": "jessica",
  "password": "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
  // 使用 SHA1 解密得到密碼 "123"
}
```
