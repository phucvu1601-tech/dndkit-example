# Dnd-kit React Example

Interactive demo of `@dnd-kit/react`, showcasing drag-and-drop patterns in a React + Vite app.

## Live Demo

- https://phucvu1601-tech.github.io/dndkit-example/

## Highlights

- Example-driven UI built with React Router v7
- Uses `@dnd-kit/react` for drag-and-drop interactions
- Based on a Biome + Vite starter setup
- Includes multiple draggable demos to learn from
- Styled with Radix UI, Tailwind-compatible utility classes, and a custom app shell

## Demo Pages

This app includes example routes for DnD behavior:

- **Draggable basic**: A simple drag-and-drop demo with live props and preview controls
- **Drag handles**: A draggable example that uses handle areas for drag initiation
- **Drag overlay**: A demo showing drag overlays for smoother visual feedback

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to view the app.

## Build

```bash
npm run build
```

## Notes

- The repository uses `react-router dev` and `react-router build` from React Router v7 tooling.
- `DragDropProvider` is mounted in `app/layouts/main-layout.tsx` so drag-and-drop is available across demo pages.
- This is a learning / prototype project for `@dnd-kit/react` usage in a modern React app.

## Base template

- RR7 Biome Starter: https://github.com/phucvu1601-tech/rr7-biome-starter
