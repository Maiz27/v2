# V2 - Monorepo

This repository contains the source code for the second iteration of my portfolio website, built with Next.js, Tailwind CSS, and Sanity. The project is structured as a monorepo using Yarn Workspaces and is managed with Turborepo.

![Portfolio Website Overview](https://drive.google.com/thumbnail?id=10k4FZT--EPVmaNBH3qrKFnKANOsSp930&sz=w1024&t=1681358800&mime=image/png)

## Table of Contents

- [V2 - Monorepo](#v2---monorepo)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project is the second version of my portfolio, designed to be open-source, easily customizable, and deployable. It features a Next.js frontend and a Sanity CMS backend for content management.

The project was inspired by [Praha's Framer template](https://darkmate.framer.website), which served as a design reference.

## Project Structure

This monorepo is organized using Yarn Workspaces and Turborepo. The workspaces are located in the `apps` and `packages` directories:

- `apps/web`: The Next.js 14 frontend application.
- `apps/studio`: The Sanity CMS studio for content management.
- `packages/*`: Shared packages and utilities, including `@v2/sanity-schemas` for type-safe Sanity content.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Yarn](https://yarnpkg.com/getting-started/install) (v1.22 or later)
- [Sanity CLI](https://www.sanity.io/docs/cli) (install globally)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Maiz27/v2.git
   cd v2
   ```

2. **Install dependencies from the root directory:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   - For the web app, copy `.env.example` to `.env` in `apps/web` and provide your Sanity project details.
   - For the Sanity studio, please refer to the detailed instructions in the [studio README](apps/studio/README.md).

## Usage

This project uses Turborepo to manage scripts. You can run the following commands from the root directory:

- **To start all applications in development mode:**

  ```bash
  yarn dev
  ```

- **To build all applications for production:**

  ```bash
  yarn build
  ```

- **To lint all applications:**

  ```bash
  yarn lint
  ```

You can also run scripts for individual applications:

- `yarn dev:web`: Starts the development server for the web app.
- `yarn dev:studio`: Starts the development server for the Sanity studio.
- `yarn build:web`: Builds the web app for production.
- `yarn build:studio`: Builds the Sanity studio for production.
- `yarn lint:web`: Lints the web app.
- `yarn lint:studio`: Lints the Sanity studio.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).
