# freeCodeCamp 成都社区 官方网站

[![Anti 996 LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)][1]
[![CI & CD](https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Technology stack

- Language: [TypeScript v5][2] + [MDX v3][10]
- Component engine: [Next.js v15][3]
- Component suite: [Bootstrap v5][4]
- PWA framework: [Workbox v6][5]
- State management: [MobX v6][11]
- CI / CD: GitHub [Actions][12] + [Vercel][13]
- Monitor service: [Sentry][14]

## Major examples

1. [Markdown articles](pages/article/)
2. [Editor components](pages/component.tsx)
3. [Pagination table](pages/pagination.tsx)
4. [Scroll list](pages/scroll-list.tsx)
5. [Not Found page (NGO)](pages/_error.tsx)
   - Global: https://notfound.org/
   - Chinese: https://www.dnpw.org/cn/pa-notfound.html

## 参与开发

请务必先做好[数据子库的准备][6]！

### 安装

```shell
# 若网速慢，可启用以下环境变量
# GIT_LFS_SKIP_SMUDGE=1

git clone --recurse-submodules \
  https://github.com/FreeCodeCamp-Chengdu/FreeCodeCamp-Chengdu.github.io.git \
  ~/Desktop/FCC-CDC/OWS/

cd ~/Desktop/FCC-CDC/OWS/

npm i pnpm -g
pnpm i  &&  pnpm dev
```

### 写作

```shell
cd ~/Desktop/FCC-CDC/OWS/pages/article/Wiki

git checkout master  # 确保子模块在 master 分支，否则提交推送后会丢失

touch _post/My-Post-title.md
code _post/My-Post-title.md  # 用你喜欢的文本编辑器写作

git add .
git commit -m "[add] A new Post"
git push
```

### 开发

```shell
cd ~/Desktop/FCC-CDC/OWS/

git submodule update --remote  # 程序开发后要同步文章目录
git checkout -b feature/My-Feature

touch pages/my-page.tsx
code pages/my-page.tsx  # 用你喜欢的 IDE 开发

git add .
git commit -m "[add] A new Feature"
git push -u origin feature/My-Feature
```

## Best practice

1.  Install GitHub apps in your organization or account:

    1.  [Probot settings][15]: set up Issue labels & Pull Request rules
    2.  [PR badge][16]: set up Online [VS Code][17] editor entries in Pull Request description

2.  Click the **[<kbd>Use this template</kbd>][18] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3.  Click the **[<kbd>Open in GitHub codespaces</kbd>][8] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately

4.  Set [Vercel variables][19] & [Lark chat bot URL][20] as [Repository secrets][21], then every commit will send a Lark message with an independent **Preview URL**

5.  Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][22] instead of IM messages or Mobile Phone calls

6.  Collect all these issues into [Project kanbans][23], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Getting Started

First, run the development server:

```bash
npm i pnpm -g
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes][24] can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as API routes instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation][25] - learn about Next.js features and API.
- [Learn Next.js][26] - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository][27] - your feedback and contributions are welcome!

## Deployment

### Environment variables

|           name           |     file     |        description        |
| :----------------------: | :----------: | :-----------------------: |
|   `SENTRY_AUTH_TOKEN`    | `.env.local` |  [Official document][28]  |
|       `SENTRY_ORG`       |    `.env`    |  [Official document][29]  |
|     `SENTRY_PROJECT`     |    `.env`    |  [Official document][29]  |
| `NEXT_PUBLIC_SENTRY_DSN` |    `.env`    |  [Official document][30]  |
|      `LARK_APP_ID`       | `.env.local` |  [Official document][31]  |
|    `LARK_APP_SECRET`     | `.env.local` |  [Official document][31]  |
| `NEXT_PUBLIC_CACHE_HOST` |    `.env`    | Static files CDN for Lark |

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform][13] from the creators of Next.js.

Check out our [Next.js deployment documentation][32] for more details.

### Docker

```shell
pnpm pack-image
pnpm container
```

[1]: https://github.com/996icu/996.ICU/blob/master/LICENSE
[2]: https://www.typescriptlang.org/
[3]: https://nextjs.org/
[4]: https://getbootstrap.com/
[5]: https://developers.google.com/web/tools/workbox
[6]: https://github.com/FreeCodeCamp-Chengdu/Wiki/#%E6%9C%AC%E6%9C%BA%E7%BC%96%E8%BE%91
[7]: https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/actions/workflows/main.yml
[8]: https://codespaces.new/freecodecamp-chengdu/freecodecamp-chengdu.github.io
[9]: https://gitpod.io/?autostart=true#https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io
[10]: https://mdxjs.com/
[11]: https://mobx.js.org/
[12]: https://github.com/features/actions
[13]: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
[14]: https://sentry.io/
[15]: https://github.com/apps/settings
[16]: https://pullrequestbadge.com/
[17]: https://code.visualstudio.com/
[18]: https://github.com/new?template_name=freecodecamp-chengdu.github.io&template_owner=freecodecamp-chengdu
[19]: https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[20]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[21]: https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/settings/secrets/actions
[22]: https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/issues/new/choose
[23]: https://github.com/freecodecamp-chengdu/freecodecamp-chengdu.github.io/projects
[24]: https://nextjs.org/docs/api-routes/introduction
[25]: https://nextjs.org/docs
[26]: https://nextjs.org/learn
[27]: https://github.com/vercel/next.js/
[28]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-configuration-files-for-source-map-upload
[29]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-environment-variables
[30]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#create-initialization-config-files
[31]: https://open.larksuite.com/document/server-docs/getting-started/api-access-token/app-access-token-development-guide#1f8b587c
[32]: https://nextjs.org/docs/deployment
