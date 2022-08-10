# これはなに

- nuxt3+Tailwind+Firebase+Vercel のテンプレートです

# 環境構築

```
    $ git clone
    $ cd nuxt3-tailwind-Firebase
    $ firebase projects:create
    # 作成したpjからマイアプリを作成し、configをenvに記録
    $ firebse deploy

    vercel にてアプリを作成し、リポジトリと連携する

    .vercel/output を公開する
```

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
