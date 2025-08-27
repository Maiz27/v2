# V2- Sanity Studio

This project provides the Sanity CMS backend for the second iteration of my portfolio website [V2](https://github.com/Maiz27/v2), built with Next.js 14 and Tailwind CSS. It allows you to manage your portfolio content in a structured and flexible way.

## Introduction

This repository houses the Sanity CMS configuration for my portfolio website. It provides a user-friendly interface to manage your website's content, including your bio, projects, and more. You can easily clone, customize, and deploy this open-source project to suit your needs.

## Getting Started

This project is part of a Yarn Workspaces monorepo. Please follow the instructions in the [root README.md](../../README.md) for the initial installation and setup.

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

After setting the environment variables, you may need to initialize the project with your Sanity project ID:

```bash
sanity init
```

## Schemas

This project's Sanity schemas are managed in a separate package, `@v2/sanity-schemas`, to ensure they are portable and reusable. This means you can easily use them in your own Sanity projects.

### Available Schemas

The following schemas are available:

- **`about`**: A singleton schema to manage your personal information, including your name, bio, image, and stats.
- **`experience`**: A schema to manage your work experience, including company details, duration, job description, and technologies used.
- **`faq`**: A schema to create a list of frequently asked questions.
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

- `yarn dev:studio`: Starts the development server for the Sanity studio.
- `yarn build:studio`: Builds the Sanity studio for production.
- `yarn lint:studio`: Lints the codebase using ESLint.
