# v2-sanity - Sanity Project for Portfolio Website

This project provides the Sanity CMS backend for the second iteration of my portfolio website [V2](https://github.com/Maiz27/v2), built with Next.js 14 and Tailwind CSS. It allows you to manage your portfolio content in a structured and flexible way.

## Table of Contents

- [v2-sanity - Sanity Project for Portfolio Website](#v2-sanity---sanity-project-for-portfolio-website)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Schemas](#schemas)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This repository houses the Sanity CMS configuration for my portfolio website. It provides a user-friendly interface to manage your website's content, including your bio, projects, and more. You can easily clone, customize, and deploy this open-source project to suit your needs.

## Getting Started

To set up this Sanity project, follow these steps:

### Prerequisites

- Node.js and npm/yarn installed on your machine.
- Sanity CLI installed globally: [Sanity CLI](https://www.sanity.io/docs/cli)
- A Sanity project ID: Create a new project on [Sanity.io](https://www.sanity.io/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Maiz27/v2-sanity.git
   cd v2-sanity
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Log in to Sanity:**

   ```bash
   sanity login
   ```

4. **Create and configure the `.env` file:**

   ```bash
   cp .env.example .env
   # Update .env with your Sanity project configuration
   ```

   Fill in the `.env` file with your `SANITY_STUDIO_PROJECT_TITLE` and `SANITY_STUDIO_PROJECT_ID`.

5. **Initialize the project with your Sanity project ID:**

   ```bash
   sanity init
   ```

6. **Start the Sanity Studio:**

   ```bash
   sanity start
   ```

   Open [http://localhost:3333](http://localhost:3333) with your browser to access the Sanity Studio interface.

## Schemas

The project includes pre-defined schemas to manage your portfolio content:

- **About Me**: Manage your name, bio, image, and skills.
- **Frequently Asked Questions (FAQs)**: Create a list of FAQs to showcase your expertise.
- **Job Experience**: Add your work experience, including titles, locations, companies, and technologies used.
- **Tools**: List the tools you're proficient in, potentially linking to SVG icons for display in your frontend.
- **Projects**: Create detailed entries for your projects, including titles, descriptions, links, and blog-style content to reflect on your learnings with code-input and language support.

## Scripts

The `package.json` file includes several scripts for development and management:

```json
{
  "scripts": {
    "start": "sanity start", // Runs Sanity Studio locally
    "build": "sanity build", // Builds Sanity Studio for production
    "deploy": "sanity deploy" // Deploys Sanity Studio to Sanity's hosting
  }
}
```

## Contributing

I welcome contributions! Feel free to fork the repository and create pull requests for improvements. Ensure your code adheres to the project's style guidelines.

## License

This project is open-source and available under the [MIT License](LICENSE).
