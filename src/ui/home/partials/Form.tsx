"use client"

import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useFormik } from "formik"
import _ from "lodash"
import IconLoader from "~/components/icon/loader"
import { TaskEntity } from "~/data/entity/task"
import useTaskById from "~/data/query/useTaskById"
import TaskRepository from "~/data/repository/task"
import { taskSchema } from "~/data/schema/task"
import { toast } from "~/hooks/use-toast"
import { queryClient } from "~/lib/WrapperReactQuery"

type AbstractFormProps = {
  initialValues: Partial<TaskEntity>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm(props: AbstractFormProps) {
  const { initialValues, mutation, isEdit } = props

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      try {
        taskSchema.parse(values)
      } catch (error: any) {
        console.log(error)
        return error.formErrors.fieldErrors
      }
    },
    onSubmit: async (values) => {
      console.log(values)

      try {
        await mutation.mutateAsync(values)
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

      formik.setSubmitting(false)
      formik.resetForm()
    },
  })

  function childBtn() {
    if (formik.isSubmitting) {
      return <IconLoader />
    } else if (isEdit) {
      return "Update"
    } else {
      return "Add"
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={clsx(
          "flex",
          isEdit ? "flex-col gap-[24px]" : "flex-row gap-[12px]",
          !isEdit && "px-[12px] py-[16px]"
        )}
      >
        <div className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Search..."
            className="w-full rounded-[7.5rem] border-[1px] border-input bg-background px-[24px] py-[15px] outline-none text-sm placeholder:text-muted-foreground focus:border-[#601feb] focus:ring-[#601feb]"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && (
            <p className="text-red-500 pl-[24px] pt-[5px]">{formik.errors.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={clsx(
            "rounded-[120px] px-[32px] h-[52px] text-base font-semibold text-primary-foreground",
            formik.isSubmitting ? "bg-transparent" : "bg-[#601feb]"
          )}
        >
          {childBtn()}
        </button>
      </div>
    </form>
  )
}

export function FormAdd() {
  const postTask = useMutation({
    mutationFn: async (formData: any) => TaskRepository.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  return <AbstractForm initialValues={{ name: "" }} mutation={postTask} />
}

export function FormEdit(props: { id: string }) {
  const { id } = props
  const { data, isLoading, isFetching } = useTaskById(id)

  const updateTask = useMutation({
    mutationFn: async (formData: any) => TaskRepository.update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] })
    },
  })

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col justify-center items-center mt-4">
        <IconLoader />
        <span>Loading...</span>
      </div>
    )
  }

  return <AbstractForm initialValues={{ name: data?.name }} mutation={updateTask} isEdit />
}
