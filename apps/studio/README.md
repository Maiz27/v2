# Sanity Studio

This project provides the Sanity CMS backend for my [portfolio website](https://github.com/Maiz27/v2), built with Next.js and Tailwind CSS. It allows you to manage your portfolio content in a structured and flexible way.

## Introduction

This repository houses the Sanity CMS configuration for my portfolio website. It provides a user-friendly interface to manage your website's content, including your bio, projects, and more. You can easily clone, customize, and deploy this open-source project to suit your needs.

## Getting Started

This project is part of a pnpm workspaces monorepo. Please follow the instructions in the [root README.md](../../README.md) for the initial installation and setup.

### Prerequisites

- [Sanity CLI](https://www.sanity.io/docs/cli) installed globally.
- A Sanity project ID. You can create a new project on [Sanity.io](https://www.sanity.io/).

### Environment Variables

To run the Sanity Studio, you need to create a `.env` file in this directory (`apps/studio`). You can copy the example file to get started:

```bash
cp .env.example .env
```

Then, fill in the following environment variables:

- `SANITY_STUDIO_PROJECT_TITLE`: The title of your Sanity Studio project.
- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID.

### Revalidation webhook

Configure a Sanity webhook to send `POST` requests to `/api/revalidate` on the deployed web app. Set the webhook secret to the web app's `SANITY_REVALIDATE_SECRET` value and use this GROQ projection:

```groq
{_type, "slug": slug.current}
```

Trigger the webhook on create, update, and delete for `project`, `aboutMe`, `cv`, `metadata`, `tool`, `experience`, and `projectKind` documents.

After setting the environment variables, you may need to initialize the project with your Sanity project ID:

```bash
sanity init
```

## Editing in Studio

The left-hand menu has three parts:

- **About Me** and **CV** exist once each, so there is no button to create, duplicate or delete them.
- **Projects** (all projects newest first, or only the ones featured on home) and **Experience** (newest role first).
- **Settings** holds Page metadata (one entry per route: `/`, `/projects`, `/cv`), Project kinds (the archive filter) and Tools (the tech stacks).

Every field says where it shows on the site. Red messages block publishing; yellow ones are advice the site still copes without, kept as warnings so documents saved before the rule existed still publish.

### Editing a project

A project opens on its **Overview** tab. The tabs:

- **Overview**: title, slug, kind, status, date (projects are listed newest first by it), featured, description and tech stack. The description is capped at 200 characters because it shows on cards, as the search description and on the share image. Keep 2 to 4 projects featured: the home page lists the 4 newest. The first tool is the one cards name.
- **Links**: the live URL and the public repository.
- **Plate**: the gallery the hero plate under the case-study header is built from. See below.
- **Case study**: the headline and the article. Start sections at Heading 2 (they are numbered and listed in the contents); Heading 3 adds a subsection. Insert a **Figure** for screenshots and a **Code snippet** or **Code tabs** for code.
- **CV**: the blurb used when the CV document lists this project.

### The plate order rule

The plate uses the first four gallery images, and their order sets their role:

1. the main screen, landscape;
2. the companion, normally a portrait phone shot;
3. and 4. two landscape details.

If every image is portrait they sit in one row. The plate has no label or caption. The first image is also the card image and the share-image thumbnail. Every image needs alt text. Drag to reorder; the Order index field only labels the list. The full layout rules are in the web app's README, under "Case-study visuals".

### Figures and code

- A **Figure** takes one image, or two shown side by side as a pair (use pairs for phone shots), each with its own alt text. Layout **Column** sits in the prose width; **Wide** spans the article column like a code listing. Figures are numbered in reading order from 01; the plate is unnumbered.
- A **Code snippet**'s filename is the path from the repository root with forward slashes (`src/lib/gist.ts`); Code tabs shorten it to the shortest ending that tells the files apart. The source URL is optional and should point at the file in the public repository, ideally pinned to a commit.
- An annotation's **Match** must be text that appears in the code exactly. **Occurrence** is 1-based and only needed when the match appears more than once. Studio warns when a match is not found; the site skips that note instead of failing the page.

### Drafts and preview

Edits save as a draft (`drafts.<id>`) and reach the site only when you press **Publish**; publishing fires the revalidation webhook above. To read a case-study draft on the real site before publishing, open `https://<site>/api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=<project-slug>`; the web app's README, under "Draft Preview", has the setup.

## Schemas

This project's Sanity schemas are managed in a separate package, `@v2/sanity-schemas`, to ensure they are portable and reusable. This means you can easily use them in your own Sanity projects.

### Available Schemas

The following schemas are available:

- **`about`**: A singleton schema to manage your personal information, including your name, bio, image, and stats.
- **`experience`**: A schema to manage your work experience, including company details, duration, and technologies used. Resume bullets live on the `experience` document's `cvBullets` field — the `cv` document only references `experience` entries, so edit bullets on the referenced experience document, not on `cv`.
- **`metadata`**: A singleton schema to manage the metadata for your website, which is crucial for SEO.
- **`project`**: A schema to manage your projects, including title, description, images, technologies, and a rich text content field for detailed project descriptions.
- **`tool`**: A schema to manage the tools and technologies you use, including name, URL, and an icon (either from `react-icons` or a custom SVG).

### Using the Schemas

To use these schemas in your Sanity project, you first need to have a Sanity project set up. If you don't have one, you can create one by running `sanity init` in your terminal.

Once you have a project, you can copy the `sanity-schemas/src` directory contents into your sanity project's `schemaTypes` directory.

Then, in your `sanity.config.ts` file, you can import the `schemaTypes` and add them to your project's schema:

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@v2/sanity-schemas' // 👈 Import the schemas
import {codeInput} from '@sanity/code-input' // 👈 Import the code input plugin

export default defineConfig({
  name: 'your-project-name',
  title: 'Your Project Title',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    codeInput(), // 👈 Add the plugin
  ],

  schema: {
    types: schemaTypes, // 👈 Add the schemas to your project
  },
})
```

### Singleton Schemas

Some schemas, like `about` and `metadata`, are intended to be "singletons," meaning there should only be one document of that type. To enforce this in the Sanity Studio, you can customize the desk structure.

This project includes a `deskStructure.ts` file that is pre-configured to handle the singleton schemas. You can copy this file into your Sanity project and then import it into your `sanity.config.ts`:

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@v2/sanity-schemas'
import {deskStructure} from './deskStructure' // 👈 Import the desk structure
import {codeInput} from '@sanity/code-input' // 👈 Import the code input plugin

export default defineConfig({
  // ... your project config

  plugins: [
    deskTool({
      structure: deskStructure, // 👈 Add the desk structure to the deskTool
    }),
    visionTool(),
    codeInput(), // 👈 Add the plugin
  ],

  schema: {
    types: schemaTypes,
  },
})
```

This will create a custom desk structure in your Sanity Studio that prevents creating more than one `about` or `metadata` document.

### Code Blocks & Syntax Highlighting

The schemas in this package come with a pre-configured rich text editor that supports code blocks with syntax highlighting. This feature is powered by the [`@sanity/code-input`](https://www.sanity.io/plugins/code-input) plugin.

#### 1. Plugin Configuration

First, ensure the plugin is added to your `sanity.config.ts` file.

```typescript
// sanity.config.ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@v2/sanity-schemas'
import {codeInput} from '@sanity/code-input' // 👈 1. Import the plugin

export default defineConfig({
  // ...
  plugins: [
    deskTool(),
    visionTool(),
    codeInput( // 👈 2. Add the plugin to the plugins array
      codeModes: [
        {
          name: 'typescript',
          loader: () =>
            import('@codemirror/lang-javascript').then(({javascript}) =>
              javascript({jsx: false, typescript: true}),
            ),
        },
        {
          name: 'java',
          loader: () => import('@codemirror/lang-java').then(({java}) => java())},
      ],
    ),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

#### 2. Language Configuration

The list of available languages for the code block is defined in `packages/sanity-schemas/src/objects/codeBlock.ts`. You can easily customize this list by modifying the `languageAlternatives` array in this file:

```typescript
// packages/sanity-schemas/src/objects/codeBlock.ts

const languageAlternatives = [
  {title: 'Typescript', value: 'typescript'},
  {title: 'Javascript', value: 'javascript'},
  {title: 'HTML', value: 'html'},
  {title: 'CSS', value: 'css'},
  // ... add or remove languages here
]

export default defineArrayMember({
  title: 'Code',
  name: 'code',
  type: 'code', // This is the type provided by the code-input plugin
  options: {
    language: 'javascript', // Default language
    languageAlternatives,
    withFilename: true,
  },
})
```

By including the `codeInput()` plugin in your config and using the `code` type in your schemas, the rich text editor will automatically render a powerful code editor with the languages you've specified.

## Available Scripts

The following scripts can be run from the root of the monorepo:

- `pnpm dev:studio`: Starts the development server for the Sanity studio.
- `pnpm build:studio`: Builds the Sanity studio for production.
- `pnpm lint:studio`: Lints the codebase using ESLint.
