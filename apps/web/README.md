# Portfolio Website

The frontend for my personal portfolio website, built with Next.js 16, Tailwind CSS, and Sanity CMS. This project is designed to be open source, allowing you to clone, customize, and deploy your own version with ease.

## Introduction

This is my portfolio website built with Next.js 16, Tailwind CSS, and Sanity CMS. You can see the live production version [here](https://www.magedfaiz.xyz/). The project is set up for easy cloning and customization.

The site is proof of work: long-form, first-person case studies grounded in real code, with interactive annotated code snippets linked back to their repositories.

## Features

- **Next.js 16**: The latest features and optimizations.
- **Tailwind CSS**: Rapidly build modern websites without ever leaving your HTML.
- **Sanity CMS**: A headless CMS to manage content with ease.
- **Sanity Type-Safe Content**: Utilizes the `@v2/sanity-schemas` package for end-to-end type safety with Sanity content.
- **TypeScript**: Static type checking for better code quality.
- **Shiki**: Server-side syntax highlighting for the interactive, annotated code snippets in case studies.
- **Case-study visuals**: A composed hero plate built from each project's gallery, plus numbered body figures (see [Case-study visuals](#case-study-visuals)).
- **Open Graph images**: Generated share cards for the site and for every case study (see [Open Graph images](#open-graph-images)).
- **Draft preview**: Review unpublished case-study edits on the real site (see [Draft Preview](#draft-preview)).

## Type Generation

This project leverages Sanity TypeGen to provide end-to-end type safety for your Sanity content. This means your frontend code will have accurate TypeScript types for all data fetched from Sanity, reducing runtime errors and improving developer experience.

To generate or update the types, run the following command from the root of the monorepo:

```bash
pnpm generate:types
```

This command will:

1. Extract your Sanity schema.
2. Generate TypeScript types based on your schemas and GROQ queries.
3. Output the generated types to `src/lib/sanity.types.ts`.

Ensure you run this command whenever your Sanity schemas or GROQ queries change to keep your types up-to-date.

## Getting Started

This project is part of a pnpm workspaces monorepo. Please follow the instructions in the [root README.md](../../README.md) for the initial installation and setup.

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
- `SANITY_REVALIDATE_SECRET`: Shared secret for the Sanity webhook that revalidates pages on publish (`/api/revalidate`).
- `SANITY_API_READ_TOKEN`: Sanity Viewer token, server-only, used to read drafts in draft preview.
- `SANITY_PREVIEW_SECRET`: Shared secret for the draft preview entry route (`/api/draft`).
- `NEXT_PUBLIC_DOMAIN`: The domain of your website (e.g., `magedfaiz.xyz`).
- `NEXT_PUBLIC_EMAIL`: The email address shown as the contact link in the footer.
- `NODE_ENV`: The node environment (e.g., `development` or `production`).

### Draft Preview

Case study drafts (`drafts.<id>` documents) can be reviewed on the real site before publishing in Studio.

1. In [sanity.io/manage](https://www.sanity.io/manage), open the project, go to **API > Tokens**, and add a token with the **Viewer** role. Set it as `SANITY_API_READ_TOKEN`.
2. Set `SANITY_PREVIEW_SECRET` to a long random string.
3. Open `https://<your-site>/api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=<project-slug>`. The case study renders with any unpublished edits and a "Draft preview" banner at the top.
4. Use the banner's **Exit preview** link (or open `/api/draft/disable`) to leave. Closing the browser also ends the session.

Draft mode only affects the browser that holds its cookie: those requests skip the cache and render fresh, while every other visitor keeps getting the cached published page.

## Case-study visuals

Case studies carry two kinds of screenshots: one hero plate under the case header, and numbered figures inside the article. Both share the same chrome as the code listings: a 1px `rule` border, the recessed `paper-sunken` surface, and a mono caption strip on raised paper. No rounded corners, no shadows, no device frames.

### The hero plate

The plate is composed from the project's gallery (`project.images[]`, in array order). The rules live in `planPlate()` in `src/components/projects/figures.ts`; `Plate.tsx` only renders the plan.

- It uses at most the first four gallery images that have a URL, width and height. Order sets the role: image 1 is the main screen, image 2 the companion (normally a portrait phone shot), images 3 and 4 the details.
- If every image is portrait, they sit in one row. Otherwise row one is the main screen and the companion, and row two holds the details (no row two without them; a single detail spans the full width).
- Within a row, each tile's width is proportional to its aspect ratio (`flex: <ratio> 1 0` plus `aspect-ratio: <ratio>`), so the row shares one height and nothing is cropped. `object-fit: cover` only absorbs rounding.
- On phones (below `md`): with details, the main screen goes full width, then the companion sits beside the details stacked in a column that shares the companion's height (the details are cover-cropped to fill it). All-portrait plates become a two-column grid. One or two images (not all portrait) stack full width.
- One image renders as a single full-width tile. No usable image renders no plate.
- The caption under "Plate 01" is the first non-empty `caption` among the images the plate shows, so put the plate's caption on the first gallery image. Date it ("Stalemates, October 2026: ..."). Each tile uses its own `alt`, falling back to "`<title>` screenshot".
- The first tile is preloaded and eager; the rest are lazy. `sizes` follows each tile's share of the 1072px content width (the 1152px container minus its padding).

Plates are composed showcases from fresh captures: the product's real screens, never a single logo or a stale screenshot.

### Body figures

Add a `figure` block to a case study's content:

- `images`: one image, or two shown side by side as a pair (phone shots). Each has its own required `alt`.
- `caption`: optional, shown in the mono strip.
- `layout`: `column` (default) sits in the 62ch prose measure; `wide` spans the article column like a code listing.

Place a figure where the prose refers to it. Numbering runs in reading order: when a plate exists it is "Plate 01" and figures continue at "Fig. 02", "Fig. 03" ...; without a plate they start at "Fig. 01". Legacy bare `image` blocks still render but take no figure number.

### Open Graph images

Share cards are generated with file-based metadata routes and rendered by `src/lib/og/card.tsx` (Satori via `next/og`, in the site's theme colors and fonts):

- `src/app/opengraph-image.tsx` is the site default card: the owner's name, role and the "Proof of work" line.
- `src/app/projects/[slug]/opengraph-image.tsx` renders a card per case study: the project name, the case-study headline and description, the route path, and the first gallery image as a "Plate 01" thumbnail (fetched from the Sanity CDN as PNG or JPEG; any failure drops the thumbnail instead of failing the card). An unknown slug falls back to the site card.

A file-based image only wins when the page's own metadata has no `images` entry. That is why the case-study page calls `buildMetadata({ image: null })`: `null` leaves `images` unset, so Next uses the generated card for Open Graph and fills Twitter from it. Passing a URL (or leaving `image` undefined, which falls back to the default image) would override it.

## Available Scripts

The following scripts can be run from the root of the monorepo:

- `pnpm dev:web`: Starts the development server for the web app.
- `pnpm build:web`: Builds the web app for production.
- `pnpm lint:web`: Lints the codebase using ESLint.
