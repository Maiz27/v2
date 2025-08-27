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

The project includes pre-defined schemas to manage your portfolio content:

- **About Me**: Manage your name, bio, image, and skills.
- **Frequently Asked Questions (FAQs)**: Create a list of FAQs to showcase your expertise.
- **Job Experience**: Add your work experience, including titles, locations, companies, and technologies used.
- **Tools**: List the tools you're proficient in, potentially linking to SVG icons for display in your frontend.
- **Projects**: Create detailed entries for your projects, including titles, descriptions, links, and blog-style content to reflect on your learnings with code-input and language support.

## Available Scripts

The following scripts can be run from the root of the monorepo:

- `yarn dev:studio`: Starts the development server for the Sanity studio.
- `yarn build:studio`: Builds the Sanity studio for production.
- `yarn lint:studio`: Lints the codebase using ESLint.
