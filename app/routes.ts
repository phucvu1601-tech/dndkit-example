import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("drag-basic", "routes/drag/drag-basic.tsx"),
    route("drag-handles", "routes/drag/drag-handles.tsx"),
    route("drag-ghost", "routes/drag/drag-ghost.tsx"),
    route("drag-overlay", "routes/drag/drag-overlay.tsx"),
    route("modifier-basic", "routes/modifier/modifier-basic.tsx"),
    route("modifier-container", "routes/modifier/modifier-container.tsx"),
    route("modifier-grid", "routes/modifier/modifier-grid.tsx"),
  ]),
] satisfies RouteConfig
