# Lark-Next-Bootstrap-ts

[Lark][0] project scaffold based on [TypeScript][2], [React][1], [Next.js][3], [Bootstrap][4] & [Workbox][5]. And this project bootstrapped with [`create-next-app`][6].

[![CI & CD](https://github.com/idea2app/Lark-Next-Bootstrap-ts/actions/workflows/main.yml/badge.svg)][7]

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

## User cases

1. https://github.com/kaiyuanshe/kaiyuanshe.github.io
2. https://github.com/idea2app/idea2app.github.io

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

[0]: https://www.larksuite.com/
[1]: https://react.dev/
[2]: https://www.typescriptlang.org/
[3]: https://nextjs.org/
[4]: https://getbootstrap.com/
[5]: https://developers.google.com/web/tools/workbox
[6]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
[7]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/actions/workflows/main.yml
[8]: https://codespaces.new/idea2app/Lark-Next-Bootstrap-ts
[9]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Lark-Next-Bootstrap-ts
[10]: https://mdxjs.com/
[11]: https://mobx.js.org/
[12]: https://github.com/features/actions
[13]: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
[14]: https://sentry.io/
[15]: https://github.com/apps/settings
[16]: https://pullrequestbadge.com/
[17]: https://code.visualstudio.com/
[18]: https://github.com/new?template_name=Lark-Next-Bootstrap-ts&template_owner=idea2app
[19]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[20]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[21]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/settings/secrets/actions
[22]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/issues/new/choose
[23]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/projects
[24]: https://nextjs.org/docs/api-routes/introduction
[25]: https://nextjs.org/docs
[26]: https://nextjs.org/learn
[27]: https://github.com/vercel/next.js/
[28]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-configuration-files-for-source-map-upload
[29]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-environment-variables
[30]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#create-initialization-config-files
[31]: https://open.larksuite.com/document/server-docs/getting-started/api-access-token/app-access-token-development-guide#1f8b587c
[32]: https://nextjs.org/docs/deployment
