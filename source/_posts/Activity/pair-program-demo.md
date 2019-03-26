---
title: 编程道场之结对活动
date:  2017-12-10
categories:
  - Activity
  - Workshop
tags:
  - offline
  - pair-programming
  - TDD
  - Agile
toc: true

# Activity meta
start:  2017-12-10 14:00
end:    2017-12-10 18:00
description:  个人分享 + 结对编程。现场用 cyber-dojo.org 网站进行演示，使用了比较简单易懂的 Word Wrap 题目。在疑似结对争吵中，两个人演示了结对编程基本的样子；如何做最简单的测试驱动开发；互相交换角色
mentors:
  - too
  - demongodYY
workers:
  - Akagilnc
  - jiangyuzhen
---

什么是 Coding Dojo？
Coding Dojo 是一个集体学习活动。一些程序员（通常是15-20人）在一起编程解决一个程序问题。一边编程，一边互相学习。
每个人可以从 Coding Dojo 中学到：解决问题的思路、编程技巧、面向对象设计、演进式设计、结对编程、测试驱动开发、持续集成等等。
<!-- More -->

# 流水帐
## 开场
由于是到新场地第一次搞活动，负责组织的小伙伴们都提前到了做准备。参加活动的小伙伴们大部分准时到场了，稍微比计划时间晚一点之后，2点左右主持人 Too 宣布了活动的开始。

先是惯例由 FCC 成都总舵主姜姜姜同学简单介绍社区的情况，然后是每个人的自我介绍，大家建立第一印象。

## 结对编程活动介绍
Too 用了半个小时左右对本次活动内容和安排进行说明，由于考虑到这次到场的小伙伴对敏捷开发和结对编程都比较陌生，所以尝试说得比较详细，对相关术语也尽量解释清楚。为了方便大家建立更直观的印象，Too 和书香一起现场用 [cyber-dojo.org](http://cyber-dojo.org) 网站进行了演示，使用了比较简单易懂的 `Word Wrap` 题目。在疑似结对争吵中，两个人演示了结对编程基本的样子；如何做最简单的测试驱动开发；互相交换角色等。这部分时间没控制好超出了计划。

## 第一个结对环节，采用题目 `FizzBuzz`
随机两两组合结对之后，大家就热火朝天的开始了结对尝试。Too 在现场对各组的观察和询问了解中发现了一些情况：
1. 在介绍演示过程中，忽略了对“红-绿-重构”这一基本动作的强调，部分小伙伴没有完全按照这个来进行练习
2. 对 TDD（测试驱动开发）这种模式的陌生，导致部分小伙伴对第一个测试测什么产生困惑，而有的小伙伴测试和实现代码一起写完才运行测试，这些都影响了对 TDD 好处的感受。
3. `cyber-dojo` 的结对编程环境在使用 `JS` 的严格语法检测下，会有不少报警，不少小伙伴都不太习惯。
由于前两个问题都是直接对活动的目的有较大影响，因为主持人不得不多次打断正在互相讨论或编码的大家，进行提醒。

4点左右，看着大家还是做得不亦乐乎，有点不忍打住。但是结对本来就应该避免太长时间的脑力消耗，所以还是强制大家停下来休息5分钟，然后回来一起看看进行的情况。在回顾的过程中，主持人随机挑选了几组结对的小伙伴的代码，按本次结对编程活动的目的进行了说明和评论，指出哪些地方是符合了设想的要求的，哪些是有所欠缺。（所有人一起查看，尽量保持了评论的代码是匿名性）

## 第二个结对环节，采用题目 `Anagrams`
应该说 `FizzBuzz` 题目还是比较简单的，重新组对之后，建议了大家尝试更难一点的题目，但是介绍环节和第一个环节的时间已经超出计划比较多了，留给这个环节的时间较少，所以整体来说，这个环节进行的不太顺利，简单抽取了几对小伙伴的代码进行一起回顾之后，就有点匆忙的结束了。

主要的一个问题是，随着题目难度的增加，应该测试什么，和如何拆分任务来达到小步迈进上，普遍缺乏 TDD 经验的小伙伴们大部分被卡住了。

## 结束
还是惯例，收集大家的反馈，然后一起合照之后，大概6点左右，结束了今天的活动。看到现场还有结对的小伙伴留下来继续讨论，感觉能激起他们的兴趣，心里挺高兴的。活动后得到的初步反馈是破冰环节不足，导致大家进入状态慢；时间控制没做好，超出计划太多；活动前期说明和准备不足，影响大家在现场的了解和实践。都是对我们活动改进的宝贵意见，其他还有的话还请大家及时反馈，对我们很重要。


## 参考资料和扩展链接
* 使用 Python 从头到尾的以 TDD 方式开发一个项目可以阅读
 [Python Web开发：测试驱动方法 (豆瓣)](https://book.douban.com/subject/26640135/) / [Praise for Test-Driven Development with Python](http://www.obeythetestinggoat.com/book/praise.harry.html)
* 要学习SOLID设计原则, 可以阅读"Agile Software Development, Principles, Patterns, and Practices", 或 "Agile Principles, Patterns, and Practices in C#”. 

* 要学习如何能为其他程序员提供编写整洁代码的反馈，可以阅读 Robert C. Martin 所著 “Clean Code”

* 要学习如果能够识别代码腐臭来做重构，可以阅读 Martin Fowler 所著 “Refactoring”

* 要学习如何将难以测试的遗留代码改造为便于测试的情形来编写测试，可以阅读 Michael Feathers 所著 “Working Effectively with Legacy Code”

* [结对编程的正确姿势，你会了吗？ – ThoughtWorks洞见](http://insights.thoughtworks.cn/pair-programming/)

* [重新思考 Code Retreat - Seaborn Lee - ThoughtWorks 咨询师](http://www.seabornlee.cn/post/pei-yang-zhe/zhong-xin-si-kao-code-retreat)

* [如何爱上结对编程 » Topics » 中国软件匠艺小组](https://codingstyle.cn/topics/244)

* [告诉你什么叫结对编程！ Atlassian愚人节视频—在线播放—优酷网，视频高清在线观看](http://v.youku.com/v_show/id_XNTQxNTYyMzMy.html?from=s1.8-1-1.2)
