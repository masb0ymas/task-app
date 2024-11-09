"use client"

import { IconEdit } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import _ from "lodash"
import { useState } from "react"
import IconTrash from "~/components/icon/trash"
import { Checkbox } from "~/components/ui/checkbox"
import { Dialog } from "~/components/ui/dialog"
import MyDialog from "~/components/ui/partials/MyDialog"
import MyTooltip from "~/components/ui/partials/MyTooltip"
import TaskRepository from "~/data/repository/task"
import { toast } from "~/hooks/use-toast"
import { queryClient } from "~/lib/WrapperReactQuery"
import { FormEdit } from "./partials/Form"

type ListItemProps = {
  id: string
  name: string
  is_finished: boolean
}

export default function ListItem(props: ListItemProps) {
  const { id, name, is_finished } = props
  const [open, setOpen] = useState(false)

  const updateTask = useMutation({
    mutationFn: async (formData: any) => TaskRepository.update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  const deleteTask = useMutation({
    mutationFn: async (id: string) => TaskRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  async function handleDelete(id: string) {
    try {
      await deleteTask.mutateAsync(id)
    } catch (error: any) {
      const title = "Catch Error, Please Try Again!"
      let message = "Something went wrong!"

      if (error.response.status === 404) {
        message = _.get(error, "response.data.message", "Task not found")
      }

      toast({
        title,
        description: message,
      })
    }
  }

  async function handleCheckbox(checked: string | boolean) {
    try {
      await updateTask.mutateAsync({ name, is_finished: checked })
    } catch (error: any) {
      const title = "Catch Error, Please Try Again!"
      let message = "Something went wrong!"

      if (error.response.status === 404) {
        message = _.get(error, "response.data.message", "Task not found")
      }

      toast({
        title,
        description: message,
      })
    }
  }

  return (
    <div className="flex flex-row justify-between bg-white rounded-[120px] py-[12px] px-[24px]">
      <div className="flex gap-[12px] items-center">
        <Checkbox
          id={`is_finished-${id}`}
          name="is_finished"
          className="data-[state=checked]:bg-[#601feb]"
          defaultChecked={is_finished}
          onCheckedChange={(checked) => handleCheckbox(checked)}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <MyDialog
            title="Edit task"
            triggerChild={
              <label
                className={clsx(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer",
                  is_finished && "line-through"
                )}
              >
                {name}
              </label>
            }
          >
            <FormEdit id={id} closeDialog={() => setOpen(false)} />
          </MyDialog>
        </Dialog>
      </div>

      <div className="flex gap-[8px]">
        <Dialog open={open} onOpenChange={setOpen}>
          <MyDialog title="Edit task" triggerChild={<IconEdit stroke={1.5} />}>
            <FormEdit id={id} closeDialog={() => setOpen(false)} />
          </MyDialog>
        </Dialog>

        <MyTooltip label="Delete task" onClick={() => handleDelete(id)}>
          <IconTrash />
        </MyTooltip>
      </div>
    </div>
  )
}
