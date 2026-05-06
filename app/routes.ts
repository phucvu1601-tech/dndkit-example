import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("drag-basic", "routes/drag-basic.tsx"),
    route("drag-handles", "routes/drag-handles.tsx"),
    route("drag-overlay", "routes/drag-overlay.tsx"),
  ]),
] satisfies RouteConfig
