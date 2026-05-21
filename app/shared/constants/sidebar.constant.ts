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
            title: "Drag ghost",
            url: "/drag-ghost",
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
      {
        title: "Modifier",
        items: [
          {
            title: "Modifier basic",
            url: "/modifier-basic",
          },
          {
            title: "Modifier container",
            url: "/modifier-container",
          },
          {
            title: "Modifier grid",
            url: "/modifier-grid",
          },
        ],
      },
      {
        title: "Sensor",
        items: [
          {
            title: "Sensor basic constraint",
            url: "/sensor-basic-constraint",
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
