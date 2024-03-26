---
title: "在PowerShell底下使用Jabba來管理JDK"
author: tarmac
category: java
tags: [Java, JDK, Jabba, PowerShell]
description: "介紹如何安裝及使用 Jabba 來管理你的 Java JDK"
createdTime: "2023-03-16T19:30:16+08:00"
draft: true
---

# 在 PowerShell 底下使用 Jabba 來管理 JDK

## Table of Contents

## 前言

我想要讓我的 PowerShell 環境在調用 JDK 時有彈性可以隨時切換版本靈活使用，在 WSL 底下有 sdkman 可以用，但在 Pure PowerShell 底下就要找別的解決方案，我找到了一個叫 Jabba 的工具，這篇文章簡單介紹如何安裝及使用

> [Jabba][Jabba repo] 官方介紹
>
> Java Version Manager inspired by nvm (Node.js). Written in Go.

## 安裝

### 避免用 Scoop 來安裝 Jabba

雖然我很喜歡用 Scoop`(一種套件管理工具像是macOS上的homebrew)`管理我所有的開發工具，但這邊用 Scoop 來安裝 Jabba 會有一些問題應該避免使用

[相關 issue][issue]

[這篇文章也有提到這點][jonz94]

### 直接用官方提供的指令來安裝

用 PowerShell 執行以下指令

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-Expression (
  Invoke-WebRequest https://github.com/shyiko/jabba/raw/master/install.ps1 -UseBasicParsing
).Content
(use the same command to upgrade)
```

## 基本使用

### 列出所有 Java 17 版本可供安裝的 JDK

```powershell
> jabba ls-remote | grep 1.17
amazon-corretto@1.17.0-0.35.1
openjdk@1.17.0
openjdk-ri@1.17.0
zulu@1.17.0-0

```

### 安裝openjdk@1.17.0

```powershell
> jabba install openjdk@1.17.0
> jabba current
openjdk@1.17.0
```

> 安裝完會直接將當前的 JDK 切換至該版本

### 透過 alias default 設定預設的 JDK 版本

```powershell
> jabba alias default openjdk@1.17.0
default -> C:\Users\hugo\.jabba\jdk\openjdk@1.17.0
> jabba use default
> jabba current
openjdk@1.17.0
```

> :warning: `jabba alias default openjdk@2.17.0` 執行完後會`~/.jabba`這個資料夾底下新增一個叫`default.alias`的檔案，內容為`openjdk@1.17.0`，下次執行`jabba use default`就會到剛剛新增的檔案裡取得預設的 JDK 版本

### 修改 Profile 讓每一次啟動 shell session 時，自動配置預設的 JDK

> 因為 Jabba 不是透過設定 JAVA_HOME 的方式去指向 JDK 的位置，使用 Jabba 後只會在該 session 下保存相關的環境變數，只要關閉該 session 這些環境變數就會跟著消失，等到下一次建立新的 session 就會找不到任何的 JDK，這樣使用起來不是很方便

先找到 profile 的路徑

```powershell
> $profile | Format-List * -force

AllUsersAllHosts       : C:\Program Files\PowerShell\7\profile.ps1
AllUsersCurrentHost    : C:\Program Files\PowerShell\7\Microsoft.PowerShell_profile.ps1
CurrentUserAllHosts    : C:\Users\hugo\Documents\PowerShell\profile.ps1
CurrentUserCurrentHost : C:\Users\hugo\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
Length                 : 67
```

我只想要套用設定到當前使用者上，修改

```powershell
C:\Users\hugo\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

```powershell
這行在安裝完Jabba後應該會自己出現不用特別新增
if (Test-Path "$env:JABBA_HOME\jabba.ps1") { . "$env:JABBA_HOME\jabba.ps1" }

我們要新增這一行，當default.alias檔案存在時，執行`jabba use default`
if (Test-Path "$env:USERPROFILE\.jabba\default.alias") { jabba use default }
```

建立新的 shell session 來試試

```powershell
PowerShell 7.3.3
> jabba current
openjdk@1.17.0
```

### 透過.jabbarc 設定預設的 JDK

```powershell
> echo "zulu@1.8.0" > ./jabbarc
> jabba use
> jabba current
zulu@1.8.0
```

> :warning: `jabba use` 會嘗試找到當前目錄的`.jabbarc`後配置 JDK，若該檔案不存在則會傳回 help info

[Jabba repo]: https://github.com/shyiko/jabba
[JAVA_HOME]: https://jvmaware.com/multiple-java-versions/
[issue]: https://github.com/shyiko/jabba/issues/707
[jonz94]: https://hackmd.io/@jonz94/BJbp3lsnu
