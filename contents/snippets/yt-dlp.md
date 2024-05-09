---
title: yt-dlp
author: tarmac
type: snippet
category: Tools
description: '透過命令行指令操作的 Youtube Downloader'
tags:
  - 'Youtube'
keywords:
  - ''
cover: ''
coverFigure: ''
draft: false
createdTime: '2024-04-24T23:50:16.043Z'
---

# {{ title }}

[yt-dlp](https://github.com/yt-dlp/yt-dlp) 是一個透過命令行指令操作的 YouTube Downloader

## 安裝

### macOS

#### Homebrew
```bash
brew install yt-dlp
```

> 透過 `Homebrew` 來安裝 `yt-dlp` 會自動安裝其他相依套件，如果是透過預先編譯完的執行檔 (executable) 來執行 `yt-dlp` 在使用時部分功能可能會無法運作，像是在下載時加入 `--merge-output-format mp4` 選項會將下載回來的視訊及音訊檔案合併成 mp4 格式，如果執行環境缺少 `ffmpeg` 套件合併會執行失敗。
> 

## 基本用法

### 下載影片

```bash
yt-dlp "https://www.youtube.com/watch?v=q3zqJs7JUCQ"
```

### 運作原理

藉由觀察下載過程產生的訊息我們可以得知 `yt-dlp` 的運作原理

```bash
yt-dlp "https://www.youtube.com/watch?v=q3zqJs7JUCQ"
[youtube] Extracting URL: https://www.youtube.com/watch?v=q3zqJs7JUCQ
[youtube] q3zqJs7JUCQ: Downloading webpage
[youtube] q3zqJs7JUCQ: Downloading ios player API JSON
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] Skipping player responses from android clients (got player responses for video "aQvGIIdgFDM" instead of "q3zqJs7JUCQ")
[youtube] q3zqJs7JUCQ: Downloading m3u8 information
[info] q3zqJs7JUCQ: Downloading 1 format(s): 616+251
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 49
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4
[download] 100% of   88.17MiB in 00:02:33 at 586.97KiB/s
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm
[download] 100% of    3.81MiB in 00:00:07 at 508.50KiB/s
[Merger] Merging formats into "Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].webm"
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4 (pass -k to keep)
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm (pass -k to keep)
```

a. 下載開始前先找到影片的串流資源格式列表 `m3u8 playlist`

```bash
   [youtube] q3zqJs7JUCQ: Downloading m3u8 information
```

b. 每支影片在 `Youtube` 上提供了數種不同的串流資源格式以滿足每個用戶的需求，因此下載時需指定格式 `ID` 才能下載，若不指定 `ID` 下載時預設會帶入 `-f bestvideo*+bestaudio/best` `yt-dlp` 會從列表中找到最佳的視訊及音訊格式進行下載

```bash
[info] q3zqJs7JUCQ: Downloading 1 format(s): 616+251
```

c. 開始進行下載

```bash
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 49
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4
[download] 100% of   88.17MiB in 00:02:33 at 586.97KiB/s
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm
[download] 100% of    3.81MiB in 00:00:07 at 508.50KiB/s
```

d. 視訊是以片段的方式存放的，可以從 `m3u8 manifest` 裡得到片段資訊

```bash
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 49
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4
[download] 100% of   88.17MiB in 00:02:33 at 586.97KiB/s
```

e. 音訊沒有片段的設計

```bash
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm
[download] 100% of    3.81MiB in 00:00:07 at 508.50KiB/s
```

f. 將下載回來的視訊及音訊做合併成為一個完整的影片

```bash
[Merger] Merging formats into "Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].webm"
```

g. 合併完成後將暫存檔 (視訊及音訊檔) 清除

```bash
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4 (pass -k to keep)
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm (pass -k to keep)
```

### 列出所有可用的串流格式

```bash
yt-dlp --list-formats "https://www.youtube.com/watch?v=q3zqJs7JUCQ"

[youtube] Extracting URL: https://www.youtube.com/watch?v=q3zqJs7JUCQ
[youtube] q3zqJs7JUCQ: Downloading webpage
[youtube] q3zqJs7JUCQ: Downloading ios player API JSON
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] Skipping player responses from android clients (got player responses for video "aQvGIIdgFDM" instead of "q3zqJs7JUCQ")
[youtube] q3zqJs7JUCQ: Downloading player 7d1f7724
[youtube] q3zqJs7JUCQ: Downloading m3u8 information
[info] Available formats for q3zqJs7JUCQ:
ID  EXT   RESOLUTION FPS CH │   FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR ASR MORE INFO
────────────────────────────────────────────────────────────────────────────────────────────────────────────────
sb3 mhtml 48x27        0    │                  mhtml │ images                                  storyboard
sb2 mhtml 80x45        1    │                  mhtml │ images                                  storyboard
sb1 mhtml 160x90       1    │                  mhtml │ images                                  storyboard
sb0 mhtml 320x180      1    │                  mhtml │ images                                  storyboard
233 mp4   audio only        │                  m3u8  │ audio only          unknown             Default
234 mp4   audio only        │                  m3u8  │ audio only          unknown             Default
139 m4a   audio only      2 │    1.45MiB   49k https │ audio only          mp4a.40.5   49k 22k low, m4a_dash
249 webm  audio only      2 │    1.46MiB   49k https │ audio only          opus        49k 48k low, webm_dash
250 webm  audio only      2 │    1.93MiB   65k https │ audio only          opus        65k 48k low, webm_dash
140 m4a   audio only      2 │    3.85MiB  129k https │ audio only          mp4a.40.2  129k 44k medium, m4a_dash
251 webm  audio only      2 │    3.81MiB  128k https │ audio only          opus       128k 48k medium, webm_dash
602 mp4   256x144     12    │ ~  3.26MiB  110k m3u8  │ vp09.00.10.08  110k video only
394 mp4   256x144     24    │    1.73MiB   58k https │ av01.0.00M.08   58k video only          144p, mp4_dash
269 mp4   256x144     24    │ ~  5.12MiB  173k m3u8  │ avc1.4D400C    173k video only
160 mp4   256x144     24    │    3.30MiB  111k https │ avc1.4D400C    111k video only          144p, mp4_dash
603 mp4   256x144     24    │ ~  5.32MiB  179k m3u8  │ vp09.00.11.08  179k video only
278 webm  256x144     24    │    2.33MiB   78k https │ vp09.00.11.08   78k video only          144p, webm_dash
395 mp4   426x240     24    │    2.78MiB   93k https │ av01.0.00M.08   93k video only          240p, mp4_dash
229 mp4   426x240     24    │ ~  9.33MiB  314k m3u8  │ avc1.4D4015    314k video only
133 mp4   426x240     24    │    7.29MiB  245k https │ avc1.4D4015    245k video only          240p, mp4_dash
604 mp4   426x240     24    │ ~ 10.46MiB  352k m3u8  │ vp09.00.20.08  352k video only
242 webm  426x240     24    │    4.26MiB  143k https │ vp09.00.20.08  143k video only          240p, webm_dash
396 mp4   640x360     24    │    5.32MiB  179k https │ av01.0.01M.08  179k video only          360p, mp4_dash
230 mp4   640x360     24    │ ~ 23.83MiB  803k m3u8  │ avc1.4D401E    803k video only
134 mp4   640x360     24    │   12.02MiB  404k https │ avc1.4D401E    404k video only          360p, mp4_dash
18  mp4   640x360     24  2 │   15.56MiB  523k https │ avc1.42001E         mp4a.40.2       44k 360p
605 mp4   640x360     24    │ ~ 19.42MiB  654k m3u8  │ vp09.00.21.08  654k video only
243 webm  640x360     24    │    7.18MiB  242k https │ vp09.00.21.08  242k video only          360p, webm_dash
397 mp4   854x480     24    │    9.27MiB  312k https │ av01.0.04M.08  312k video only          480p, mp4_dash
231 mp4   854x480     24    │ ~ 40.19MiB 1354k m3u8  │ avc1.4D401E   1354k video only
135 mp4   854x480     24    │   23.59MiB  794k https │ avc1.4D401E    794k video only          480p, mp4_dash
606 mp4   854x480     24    │ ~ 31.70MiB 1068k m3u8  │ vp09.00.30.08 1068k video only
244 webm  854x480     24    │   11.83MiB  398k https │ vp09.00.30.08  398k video only          480p, webm_dash
398 mp4   1280x720    24    │   17.59MiB  592k https │ av01.0.05M.08  592k video only          720p, mp4_dash
232 mp4   1280x720    24    │ ~ 76.23MiB 2568k m3u8  │ avc1.4D401F   2568k video only
136 mp4   1280x720    24    │   45.82MiB 1542k https │ avc1.4D401F   1542k video only          720p, mp4_dash
609 mp4   1280x720    24    │ ~ 49.08MiB 1654k m3u8  │ vp09.00.31.08 1654k video only
247 webm  1280x720    24    │   21.04MiB  708k https │ vp09.00.31.08  708k video only          720p, webm_dash
399 mp4   1920x1080   24    │   31.28MiB 1053k https │ av01.0.08M.08 1053k video only          1080p, mp4_dash
270 mp4   1920x1080   24    │ ~139.67MiB 4705k m3u8  │ avc1.640028   4705k video only
137 mp4   1920x1080   24    │   89.08MiB 2997k https │ avc1.640028   2997k video only          1080p, mp4_dash
614 mp4   1920x1080   24    │ ~ 78.28MiB 2637k m3u8  │ vp09.00.40.08 2637k video only
248 webm  1920x1080   24    │   36.79MiB 1238k https │ vp09.00.40.08 1238k video only          1080p, webm_dash
616 mp4   1920x1080   24    │ ~170.49MiB 5744k m3u8  │ vp09.00.40.08 5744k video only          Premium
```
### 下載後自動加上影片縮圖

```bash
yt-dlp --embed-thumbnail "https://www.youtube.com/watch?v=q3zqJs7JUCQ"
```

### 單獨下載音訊

```bash
yt-dlp -f 251 "https://www.youtube.com/watch?v=q3zqJs7JUCQ"
```

#### 將音訊轉成 Mp3

```bash
yt-dlp -f 251 --extract-audio --audio-format mp3 "https://www.youtube.com/watch?v=q3zqJs7JUCQ"
```

### 下載直播影片

```bash
yt-dlp --live-from-start --merge-output-format mp4 --embed-thumbnail "https://www.youtube.com/watch?v=rntsXse2noY"
```

#### 指定影片開始時間

直播影片開始時可能會因為前置作業時間留有一段沒有內容的空白片段，可以加入 `--wait-for-video 60` 將影片的起始點推遲60秒再下載

```bash
yt-dlp --live-from-start --merge-output-format mp4 --embed-thumbnail --wait-for-video 233 "https://www.youtube.com/watch?v=rntsXse2noY"
```

## 疑難排解

### Unable to download API page

下載影片時出現 `HTTP Error 400 (Precondition check failed)`，原因是 `yt-dlp` 的版本過舊，更新後可以解決問題

```bash
yt-dlp "https://www.youtube.com/watch?v=q3zqJs7JUCQ"

[youtube] Extracting URL: https://www.youtube.com/watch?v=q3zqJs7JUCQ
[youtube] q3zqJs7JUCQ: Downloading webpage
[youtube] q3zqJs7JUCQ: Downloading ios player API JSON
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] YouTube said: ERROR - Precondition check failed.
WARNING: [youtube] HTTP Error 400: Bad Request. Retrying (1/3)...
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] YouTube said: ERROR - Precondition check failed.
WARNING: [youtube] HTTP Error 400: Bad Request. Retrying (2/3)...
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] YouTube said: ERROR - Precondition check failed.
WARNING: [youtube] HTTP Error 400: Bad Request. Retrying (3/3)...
[youtube] q3zqJs7JUCQ: Downloading android player API JSON
WARNING: [youtube] YouTube said: ERROR - Precondition check failed.
WARNING: [youtube] Unable to download API page: HTTP Error 400: Bad Request (caused by <HTTPError 400: Bad Request>); please report this issue on  https://github.com/yt-dlp/yt-dlp/issues?q= , filling out the appropriate issue template. Confirm you are on the latest version using  yt-dlp -U
[youtube] q3zqJs7JUCQ: Downloading player 8fc6998a
[youtube] q3zqJs7JUCQ: Downloading m3u8 information
[info] q3zqJs7JUCQ: Downloading 1 format(s): 616+251
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 49
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4
[download] 100% of   88.17MiB in 00:02:31 at 596.50KiB/s
[download] Destination: Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm
[download] 100% of    3.81MiB in 00:00:06 at 574.16KiB/s
[Merger] Merging formats into "Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].webm"
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f616.mp4 (pass -k to keep)
Deleting original file Taylor Swift - Fortnight (feat. Post Malone) (Official Music Video) [q3zqJs7JUCQ].f251.webm (pass -k to keep)
```

```bash
brew upgrade yt-dlp
```