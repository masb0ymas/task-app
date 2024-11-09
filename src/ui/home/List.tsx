"use client"

import clsx from "clsx"
import React from "react"
import IconLoader from "~/components/icon/loader"
import IconTrash from "~/components/icon/trash"
import { Checkbox } from "~/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

export function List() {
  const data = [
    {
      id: "1",
      name: "Read a book",
      is_finished: true,
    },
    {
      id: "2",
      name: "Learn Flutter for 1 hour",
      is_finished: false,
    },
    {
      id: "3",
      name: "Learn React for 1 hour",
      is_finished: false,
    },
  ]

  return (
    <div className="flex flex-col gap-[24px] p-[16px]">
      <div className="w-full items-center">
        <div className="flex flex-col gap-[12px]">
          {data.map((item) => (
            <ListItem {...item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <IconLoader />
      </div>
    </div>
  )
}

type ListItemProps = {
  id: string
  name: string
  is_finished: boolean
}

export function ListItem(props: ListItemProps) {
  const { id, name, is_finished } = props

  return (
    <div className="flex flex-row justify-between bg-white rounded-[120px] py-[12px] px-[24px]">
      <div className="flex gap-[12px] items-center">
        <Checkbox
          id={`is_finished-${id}`}
          name="is_finished"
          className="data-[state=checked]:bg-[#601feb]"
          defaultChecked={is_finished}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => console.log("edit", { id })}>
              <label
                className={clsx(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  is_finished && "line-through"
                )}
              >
                {name}
              </label>
            </TooltipTrigger>
            <TooltipContent>Edit task</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => console.log("deleted", { id })}>
            <IconTrash />
          </TooltipTrigger>
          <TooltipContent>
            <span>Delete</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
