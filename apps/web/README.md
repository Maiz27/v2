# v2 - Portfolio Website

Welcome to the second iteration of my portfolio website, now enhanced with Next.js 14, Tailwind CSS, and Sanity CMS. This project is designed to be open source, allowing you to clone, customize, and deploy your own version with ease.

## Introduction

This is the second version of my portfolio website built with Next.js 14, Tailwind CSS, and Sanity CMS. You can see the live production version [Preview](https://www.magedfaiz.xyz/). The project is set up for easy cloning and customization.

This project was inspired by [Praha's Framer template](https://darkmate.framer.website). I used it as the primary design reference, building this project from scratch and customizing it to suit my needs and style.

## Features

- **Next.js 14**: The latest features and optimizations.
- **Tailwind CSS**: Rapidly build modern websites without ever leaving your HTML.
- **Sanity CMS**: A headless CMS to manage content with ease.
- **TypeScript**: Static type checking for better code quality.
- **Framer Motion**: An open-source motion library to power animations.

## Getting Started

This project is part of a Yarn Workspaces monorepo. Please follow the instructions in the [root README.md](../../README.md) for the initial installation and setup.

### Prerequisites

- A Sanity project set up and configured. You can use the `apps/studio` workspace in this monorepo as a starting point.

### Environment Variables

To run the web application, you need to create a `.env` file in this directory (`apps/web`). You can copy the example file to get started:

```bash
cp .env.example .env
```

Then, fill in the following environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset name (e.g., `production`).
- `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username, used for the activity calendar.
- `RESEND_API_KEY`: Your API key for Resend, used for the contact form.
- `NEXT_PUBLIC_DOMAIN`: The domain of your website (e.g., `magedfaiz.xyz`).
- `NEXT_PUBLIC_EMAIL`: The email address you want to receive contact form submissions at.
- `NODE_ENV`: The node environment (e.g., `development` or `production`).

## Available Scripts

The following scripts can be run from the root of the monorepo:

- `yarn dev:web`: Starts the development server for the web app.
- `yarn build:web`: Builds the web app for production.
- `yarn lint:web`: Lints the codebase using ESLint.
