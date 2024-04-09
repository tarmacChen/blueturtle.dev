---
title: "App is Damaged"
category: snippets
description: ""
author: tarmac
tags: [macOS]
createdTime: "2023-08-28T07:56:54+08:00"
draft: true
---

# {{ title }}

## How to resolve "is damaged and can't be opened" when open some app on macOS

### Allow applications downloaded from "Anywhere"

```bash
show anywhere
> sudo spctl --master-disable

set default
> sudo spctl --master-enable
```

### Create a fake sign for unknown app

```bash
xattr -rc /Applications/RyuSAK.app && codesign --force --deep --sign - /Applications/RyuSAK.app
```
