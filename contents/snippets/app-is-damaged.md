---
title: "How to resolve App is Damaged when open on macOS"
category: snippets
description: ""
author: tarmac
tags: [macOS]
createdTime: "2023-08-28T07:56:54+08:00"
draft: false
---

# {{ title }}

![APPISDAMAGED](/public/img/app-is-damaged.png)

## Allow applications downloaded from "Anywhere"

```bash
show anywhere
> sudo spctl --master-disable

set default
> sudo spctl --master-enable
```

## Create a fake sign for unknown app

```bash
xattr -rc /Applications/RyuSAK.app && codesign --force --deep --sign - /Applications/RyuSAK.app
```
