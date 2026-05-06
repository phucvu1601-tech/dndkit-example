export interface NavItem {
  title: string
  url: string
}

export interface NavMain {
  title: string
  url?: string
  items?: NavItem[]
}

export interface NavGroup {
  title: string
  navMains: NavMain[]
}
