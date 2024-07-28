# v2 - Portfolio Website

Welcome to the second iteration of my portfolio website, now enhanced with Next.js 14, Tailwind CSS, and Sanity CMS. This project is designed to be open source, allowing you to clone, customize, and deploy your own version with ease.

![Portfolio Website Overview](https://drive.google.com/thumbnail?id=11gOxjCwwOWx1T-aRRooUmTKppBxYPPFU&sz=w1024&t=1681358800&mime=image/png)

## Table of Contents

- [v2 - Portfolio Website](#v2---portfolio-website)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This is the second version of my portfolio website built with Next.js 14, Tailwind CSS, and Sanity CMS. You can see the live production version [here](https://www.magedfaiz.xyz/). The project is set up for easy cloning and customization.

This project was inspired by [Praha's Framer template](https://darkmate.framer.website). I used it as the primary design reference, building this project from scratch and customizing it to suit my needs and style.

## Features

- **Next.js 14**: The latest features and optimizations.
- **Tailwind CSS**: Rapidly build modern websites without ever leaving your HTML.
- **Sanity CMS**: A headless CMS to manage content with ease.
- **TypeScript**: Static type checking for better code quality.
- **Framer Motion**: An open-source motion library to power animations.

## Getting Started

To get started with this project, you first need to set up a Sanity project. My default Sanity project is also open source and can be used as a reference for how the data should be structured. You can find it [here](https://github.com/Maiz27/v2-sanity).

### Prerequisites

- Node.js and npm/yarn installed on your machine.
- A Sanity project set up and configured. You can use [V2 Sanity](https://github.com/Maiz27/v2-sanity) as a reference.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Maiz27/v2.git
   cd v2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create and configure the `.env` file:**

   ```bash
   cp .env.example .env
   # Update .env with your Sanity project configuration
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

The `package.json` includes several scripts for common tasks:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to lint your code.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's style guidelines and passes all tests.

## License

This project is open-source and available under the [MIT License](LICENSE).
