# Mermaid.js Distribution Packager

This repository contains pre-built/extracted distribution files of the
[Mermaid](https://github.com/mermaid-js/mermaid) library. It is configured to
automatically download, clean, and structure specific versioned builds of
Mermaid.

## Project Structure

- `main.ts`: The main Deno script that installs Mermaid via npm, extracts the
  distribution files (`dist/`, `package.json`, `README.md`, `LICENSE`), and
  cleans up unnecessary assets (like `.map` and `.d.ts` files).
- `deno.json`: Deno configuration defining tasks and standard library imports.
- `LICENSE`: The MIT License for this distribution wrapper.

## How to Update / Run

To update or repackage Mermaid:

1. Ensure [Deno](https://deno.land/) is installed on your system.
2. Open `main.ts` and modify the `version` constant to target your desired
   Mermaid version:
   ```typescript
   const version = "11.16.1";
   ```
3. Run the packaging task using Deno:
   ```bash
   deno task main
   ```

This will automatically:

- Remove the existing version folder.
- Install the specified version of `mermaid` from npm.
- Move the required distribution assets to the root of the version folder.
- Clean up any source maps, type definitions (`.d.ts`), and build artifacts that
  are not needed.
