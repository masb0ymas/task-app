import { PropsWithChildren } from "react"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../dialog"

type MyDialogProps = PropsWithChildren & {
  title: string
  subtitle?: string
  triggerChild?: React.ReactNode
}

export default function MyDialog(props: MyDialogProps) {
  const { title, subtitle, children, triggerChild } = props

  return (
    <>
      <DialogTrigger>{triggerChild}</DialogTrigger>
      <DialogOverlay />

      <DialogContent className="!rounded-[16px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center font-semibold text-[24px] leading-[36px]">
            {title}
          </DialogTitle>

          {subtitle && (
            <DialogDescription>
              <div className="flex flex-col gap-[24px] px-[12px] py-[16px] pb-0">{subtitle}</div>
            </DialogDescription>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </>
  )
}
