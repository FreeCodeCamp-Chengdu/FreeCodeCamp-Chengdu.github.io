---
title: 内容型网站应用一小时实战
date: 2019-03-22 17:39:26
updated: 2019-03-25 22:59:27
categories:
  - Activity
  - Workshop
tags:
  - online
  - Web
  - Hexo
  - GitHub
  - Wiki
toc: true

# Activity meta
start: 2019-03-24 20:00
end: 2019-03-24 22:00
description: "freeCodeCamp 成都社区 在线工作坊 #1"
mentors:
  - TechQuery
  - too
  - Akagilnc
  - demongodYY
workers:
  - jiangyuzhen
  - alicaiting
---

freeCodeCamp 成都社区 在线工作坊 #1

> 原文链接：https://shimo.im/docs/PcIvVWp7Ok8qnb5X

## 学习收获

个人、公益组织、创业团队 快速搭建自己的网站，并生成智能机桌面的 App，同时掌控所有数据、轻松迁移。

## 教程主旨

  - **内容型网站**：新闻门户、官方网站、个人博客、维基百科、技术文档
  - **网站应用**：基于 Google 力主的 PWA 国际标准，一键生成网站的 App
  - **零基础**、**零成本**、**免维护**：开源的一键化生成工具、个人免费的自动化云服务

<!-- More -->

## 在线课堂

2019 年 3 月 24 日（周日晚）20:00~22:00

## 内容大纲

- [ ] [基础软件安装](https://tech-query.me/development/coder-start-kit/)（课前准备，下附截图）
- [ ] [挑选 Hexo 主题模板](https://hexo.io/themes/)（课前准备）
- [ ] [网站项目生成](https://tech-query.me/development/wiki-on-git/)

```shell
# 以 GitHub 账号 FCC 为例
npm init hexo-wiki ~/Desktop/FCC \
    --theme NexT \
    --plugins hexo-permalink-pinyin \
    --remote https://github.com/FCC/FCC.github.io.git
```

- [ ] [自定义网站配置](https://hexo.io/zh-cn/docs/configuration)
- [ ] [配置托管服务](https://pages.github.com/)
    - [ ] [GitHub 账号注册](https://github.com/join/)
- [ ] [配置部署服务](https://tech-query.me/development/hello-hexo-travis/)
- [ ] [写第一篇文章](https://hexo.io/zh-cn/docs/front-matter)
- [ ] [配置顶级域名](https://tech-query.me/development/free-web-site/)
    - [ ] [挑选、注册域名](https://www.freenom.com/zh/index.html)
    - [ ] [CloudFlare 账号注册](https://dash.cloudflare.com/sign-up)
- [ ] [生成独立应用](https://github.com/lavas-project/hexo-pwa)

## 参考文档

  - [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
  - [Git 简易指南](http://www.bootcss.com/p/git-guide/)

## 教练团队

  - 主讲：水歌
  - 助教：Akagilnc、Too、姜姜姜、书香墨剑、ing

### 助教招募

  - 必要技能：熟悉 Windows、Linux 或 Mac OS X 命令行、包管理器、Git
  - 可选技能：用过 Node.JS、Hexo（或其它静态网站生成器）

---

## 【附0】Windows 软件安装图解

### 0. 安装前提

Windows 7 / 8 / 10（及同代 Windows Server）

### 1. 打开命令行

![](PowerShell-0.png)

### 2. 安装包管理器

![](PowerShell-1.png)

（复制、粘贴以下命令）
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```
【注意】
  - 已经装了同类或同样的软件可以把那个名字删掉，不用重复装
  - 如有软件安装出现问题，可自行下载、安装，优先安装 [Zoom 客户端](https://zoom.us/download#client_4meeting)

### 3. 安装必备软件

（复制、粘贴以下命令）
```shell
choco install -y git tortoisegit nodejs-lts vscode googlechrome zoom
```

## 【附1】Mac OS X 软件安装图解

### 0. 安装前提

Mac OS X 10.10 及以上版本

### 1. 打开命令行

 - 在 SpotLight 里输入“终端”后回车
 - 或从 LaunchPad 里点击“终端”图标

![](terminal.png)

打开的界面如下，可以在这个提示符后面输入命令执行

![](terminal-console.png)

### 2. 安装 Command Line Tools

在终端里粘贴如下命令后，回车执行
```shell
xcode-select --install
```
![](xcode-install-command.png)

弹出类似这样的窗口

![](xcode-install.png)

点击 “安装” （也就是 Install），会出来如下界面，耐心等待下载安装的完成

![](xcode-downloading.png)

### 3. 安装包管理器

在终端里粘贴如下命令后，回车执行
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

界面如下

![](brew-install.png)

回车执行之后显示类似如下输出（安装过程中需要回车确认执行安装，有可能还需要输入用户的电脑密码）
![](brew-install-confirm.png)

如没有报错，看到 Installation successful 字样即表示安装成功！
![](console-succes.png)

注意：安装非常慢、超时等可能与国内网络条件有关，需要参考 [macOS安装Homebrew](https://blog.csdn.net/zzq900503/article/details/80404314) 使用国内镜像源安装。（如下图的报错）
![](brew-error2.png)

如下图的安装失败则需要参考 [Mac上安装homebrew的心酸历程](https://blog.csdn.net/sinat_41756672/article/details/80534031) 执行 git 的配置命令：
```shell
git config --global http.postBuffer 524288000
```
![](brew-error2.png)

### 4. 安装必备软件

依次执行如下两条命令进行安装 ——
```shell
brew install node cask
brew cask install sourcetree visual-studio-code google-chrome zoomus
```
【注意】
  - 已经装了同类或同样的软件可以把那个名字删掉，不用重复装
  - 如有软件安装出现问题，可自行下载、安装，优先安装 [Zoom 客户端](https://zoom.us/download#client_4meeting)

### 5. 参考资料

  - [macOS 缺失的软件包的管理器](https://brew.sh/index_zh-cn)
  - [macOS安装Homebrew](https://blog.csdn.net/zzq900503/article/details/80404314)
  - [Mac上安装homebrew的心酸历程](https://blog.csdn.net/sinat_41756672/article/details/80534031)
  - [macOS安装homebrew报错 LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54](https://juejin.im/post/5b657ee56fb9a04fa5610406)

## 【附2】Linux 安装最新版 Node.JS

Fedora/CentOS、Debian/Ubuntu 等主流发行版官方软件源的 Node.JS 版本可能 `< 6.3.0`，要先安装 **NVM**：

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
# 或者
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

再安装 Node.JS 最新 LTS 版：
```shell
nvm install --lts
```

## 【附3】科学上网工具

  - https://github.com/getlantern/lantern
  - https://psiphon.ca/zh/
