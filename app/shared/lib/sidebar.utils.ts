import { navData } from "@/shared/constants/sidebar.constant"

type NavLookupValue = {
  groupTitle: string
  mainTitle: string
  itemTitle: string
}

const normalize = (p: string) => p.replace(/\/$/, "")

const navIndex: Record<string, NavLookupValue> = {}

for (const group of navData) {
  for (const main of group.navMains) {
    // 1. NavMain has url
    if (main.url) {
      navIndex[normalize(main.url)] = {
        groupTitle: group.title,
        mainTitle: main.title,
        itemTitle: main.title,
      }
    }

    // 2. NavMain has children items
    if (main.items && main.items.length > 0) {
      for (const item of main.items) {
        navIndex[normalize(item.url)] = {
          groupTitle: group.title,
          mainTitle: main.title,
          itemTitle: item.title,
        }
      }
    }
  }
}

export function findNavByPath(pathname: string) {
  return navIndex[normalize(pathname)] ?? null
}
