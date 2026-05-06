import type { NavGroup } from "@/shared/types/sidebar.type"

export const navData: NavGroup[] = [
  {
    title: "Home",
    navMains: [
      {
        title: "Homepage",
        url: "/",
      },
    ],
  },
  {
    title: "Draggable",
    navMains: [
      {
        title: "Drag",
        items: [
          {
            title: "Drag basic",
            url: "/drag-basic",
          },
          {
            title: "Drag handles",
            url: "/drag-handles",
          },
          {
            title: "Drag overlay",
            url: "/drag-overlay",
          },
        ],
      },
    ],
  },
  {
    title: "Droppable",
    navMains: [
      {
        title: "Drop",
        items: [
          {
            title: "Drop basic",
            url: "#",
          },
          {
            title: "Drop multiple",
            url: "#",
          },
        ],
      },
    ],
  },
]
