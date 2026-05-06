import { HomePage } from "@/features/home/components/home-page"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dnd-kit react example" },
    {
      name: "description",
      content: "This is example of dnd-kit lib for react",
    },
  ]
}

export default function Home() {
  return <HomePage />
}
