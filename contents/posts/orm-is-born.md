---
title: 'ORM的誕生及了解JPA, Hibernate 與 Spring Data JPA之間的關係'
author: tarmac
category: posts
tags: [JDBC, ORM, JPA, Hibernate, Spring Data JPA]
description: ''
createdTime: '2023-03-22T20:03:18+08:00'
draft: false
---

# ORM 的誕生及了解 JPA, Hibernate 與 Spring Data JPA 之間的關係

## Table of contents

## 在沒有 ORM 之前應用程式是怎麼跟資料庫交流的

我們必須透過 JDBC API(Java Database Connectivity API)的介面搭配該資料庫適用的 JDBC Driver 去跟資料庫連接

![JDBC](/public/diagrams/orm-is-born/jdbc.png)

不同的資料庫有不同的 JDBC Driver，透過 DriverManager 針對不同的請求去回傳對應的 JDBC Driver

![JDBC Driver Manager](/public/diagrams/orm-is-born/jdbc-driver-manager.png)

## ORM 的誕生

除了上述談到針對不同的資料庫有不同的連接方式這個問題，還有應用程式內的資料要怎麼對映到資料表也是個問題，ORM(Object Relational Mapping)的出現就是為了解決這些麻煩的事情，若少了 ORM 我們要手動去處理資料在這兩者之間的映對關係

![relationship](/public/diagrams/orm-is-born/relationship.png)

在操作時要把映對關係設定好才能讓資料在物件模型與資料表中做轉換，若資料表改變了結構，映對關係也要同步做調整，實務上資料庫不會只有一種，可能有 MySQL、DB2、SQL Server 之類的，不同的資料庫有不同的結構與 SQL 語法，透過 ORM 的抽象層去設定映對關係，這樣就可以專注在跟業務邏輯有關的代碼上，不用煩惱操作不同的資料庫時，應用程式要做哪些調整才能取得那些資料，ORM 是位於資料庫與應用程式間的中間層，透過 ORM 提供的 API 介面幫你去跟資料庫打交道，聽起來一切都很美好但也有一些缺點

- 要多學一套 ORM 的 API
- 比較複雜的功能沒有辦法單獨透過 ORM 來完成，還是需要 SQL
- 多了 ORM 應用程式的性能會有些損失

![orm](/public/diagrams/orm-is-born/orm.png)

> 雖然有提到使用 ORM 會損失性能，但這並不是造成應用程式緩慢的關鍵，會造成緩慢多半是因為 SQL 語法沒有最佳化、資料庫設計不佳、應用程式架構不良等其他因素導致的，也就是說如果沒有明確的原因，ORM 帶來的性能損失可以暫且不論

## JPA 是什麼?

JPA 全名為 Jakarta Persistence API 或在早期叫 Java Persistence API，是一個 Java 官方為了實現 ORM 所制定的一套標準規範(Specification)及接口(API)，要注意這是一個規範沒辦法給開發者直接使用，必須透過像是 Hibernate、OpenJPA 或 TopLink 之類的 JPA Provider 才行

![jpa](/public/diagrams/orm-is-born/jpa.png)

## Hibernate 是什麼?

Hibernate 是 Java 生態系中最廣泛使用的 ORM 框架並且實作了 JPA 的規範

## Spring Data JPA 是什麼?

雖然我們有了 ORM 來幫助我們處理訪問持久層的操作，但這些 ORM 框架基於 JPA 規範又各自擴展了其他功能，導致開發人員無法在這些 ORM 框架之間無縫切換，於是 Spring 提出了 Spring Data JPA 這個解決方案，它是位於 JPA 與各個 ORM 框架之間經過抽象化的資料存取層(Data Access Layer)，這樣在 Spring 底下開發應用程式就不用管底下的 ORM 框架怎麼變化了

![spring-data-jpa](/public/diagrams/orm-is-born/spring-data-jpa.png)

## 總結

希望這篇文章能幫助讀者了解為什麼要有 ORM 及什麼是 ORM，還有 JPA, Hibernate 與 Spring Data JPA 之間的關係，這些觀念對於剛踏入 Spring 世界的我來說很有幫助
