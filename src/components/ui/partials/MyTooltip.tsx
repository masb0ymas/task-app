"use client"

import { MouseEventHandler, PropsWithChildren } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip"

type MyTooltipProps = PropsWithChildren & {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function MyTooltip(props: MyTooltipProps) {
  const { label, children, onClick } = props
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onClick}>{children}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
