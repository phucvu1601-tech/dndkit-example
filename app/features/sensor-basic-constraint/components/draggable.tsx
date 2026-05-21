import {
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
} from "@dnd-kit/dom"
import { useDraggable } from "@dnd-kit/react"
import { useRef } from "react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  delay?: number
  tolerance?: number
  distance?: number
}

interface ConstraintsType {
  delay: number
  tolerance: number
  distance: number
}

export function Draggable({
  id,
  children,
  delay = 2000,
  tolerance = 200,
  distance = 400,
}: DraggableProps) {
  const constraintsRef = useRef<ConstraintsType>({ delay, tolerance, distance })
  constraintsRef.current = { delay, tolerance, distance }

  const { ref } = useDraggable({
    id,
    sensors: [
      PointerSensor.configure({
        activationConstraints: () => [
          new PointerActivationConstraints.Delay({
            value: constraintsRef.current.delay,
            tolerance: constraintsRef.current.tolerance,
          }),
          new PointerActivationConstraints.Distance({
            value: constraintsRef.current.distance,
          }),
        ],
      }),
      KeyboardSensor,
    ],
  })

  return (
    <div
      ref={ref}
      style={{ touchAction: "none" }} // prevent default touch behavior from the browser
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
    >
      {children || "Draggable"}
    </div>
  )
}
