"use client"

import { IconEdit } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import IconLoader from "~/components/icon/loader"
import IconTrash from "~/components/icon/trash"
import { Checkbox } from "~/components/ui/checkbox"
import MyDialog from "~/components/ui/partials/MyDialog"
import MyTooltip from "~/components/ui/partials/MyTooltip"
import useTask from "~/data/query/useTask"
import TaskRepository from "~/data/repository/task"
import { queryClient } from "~/lib/WrapperReactQuery"
import { FormEdit } from "./partials/Form"

export function List() {
  const { data, isLoading, isFetching } = useTask()

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center">
        <IconLoader />
      </div>
    )
  }

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
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCheckbox(checked: string | boolean) {
    try {
      await updateTask.mutateAsync({ name, is_finished: checked })
    } catch (error) {
      console.log(error)
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

        <MyDialog
          title="Edit task"
          trigger={
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
          <FormEdit id={id} />
        </MyDialog>
      </div>

      <div className="flex gap-[8px]">
        <MyDialog title="Edit task" trigger={<IconEdit stroke={1.5} />}>
          <FormEdit id={id} />
        </MyDialog>

        <MyTooltip label="Delete task" onClick={() => handleDelete(id)}>
          <IconTrash />
        </MyTooltip>
      </div>
    </div>
  )
}
