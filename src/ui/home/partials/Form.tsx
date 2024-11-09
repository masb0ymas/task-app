"use client"

import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useFormik } from "formik"
import IconLoader from "~/components/icon/loader"
import { TaskEntity } from "~/data/entity/task"
import useTaskById from "~/data/query/useTaskById"
import TaskRepository from "~/data/repository/task"
import { taskSchema } from "~/data/schema/task"
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
      } catch (error) {
        console.log(error)
      }

      formik.setSubmitting(false)
      formik.resetForm()
    },
  })

  function childBtn() {
    if (isEdit) {
      return "Update"
    } else if (formik.isSubmitting) {
      return <IconLoader />
    } else {
      return "Add"
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={clsx("flex", isEdit ? "flex-col" : "flex-row", "gap-[12px] px-[12px] py-[16px]")}
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
    return <div>Loading...</div>
  }

  return <AbstractForm initialValues={{ name: data?.name }} mutation={updateTask} isEdit />
}
