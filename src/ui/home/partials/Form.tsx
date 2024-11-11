"use client"

import clsx from "clsx"
import { useFormState, useFormStatus } from "react-dom"
import { createTask, updateTask } from "~/app/actions"
import IconLoader from "~/components/icon/loader"
import { TaskEntity } from "~/data/entity/task"
import { FieldError } from "~/lib/form-field"
import { useFormReset } from "~/lib/hooks/use-form-reset"
import { queryClient } from "~/lib/WrapperReactQuery"
import { EMPTY_FORM_STATE, FormState } from "~/lib/zod"

type AbstractFormProps = {
  initialValues: Partial<TaskEntity>
  formState: FormState
  action: (payload: FormData) => void
  isEdit?: boolean
  closeDialog?: () => void
}

function AbstractForm(props: AbstractFormProps) {
  const { initialValues, isEdit, formState, action, closeDialog } = props

  const { pending } = useFormStatus()
  const formRef = useFormReset(formState)

  function onSubmit(formData: FormData) {
    action(formData)
    queryClient.invalidateQueries({ queryKey: ["task"] })

    if (isEdit) {
      closeDialog?.()
    }
  }

  function childBtn() {
    if (pending) {
      return (
        <div className="flex justify-center items-center">
          <IconLoader />
        </div>
      )
    } else if (isEdit) {
      return "Update"
    } else {
      return "Add"
    }
  }

  return (
    <form action={onSubmit} ref={formRef}>
      <div
        className={clsx(
          "flex",
          isEdit ? "flex-col gap-[24px]" : "flex-row gap-[12px]",
          !isEdit && "px-[12px] py-[16px]"
        )}
      >
        {isEdit && <input type="hidden" name="id" value={initialValues.id} />}

        <div className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Input task..."
            className="w-full rounded-[7.5rem] border-[1px] border-input bg-background px-[24px] py-[15px] outline-none text-sm placeholder:text-muted-foreground focus:border-[#601feb] focus:ring-[#601feb]"
            defaultValue={initialValues.name}
          />
          <FieldError formState={formState} name="name" />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={clsx(
            "rounded-[120px] px-[32px] h-[52px] text-base font-semibold text-primary-foreground",
            pending ? "bg-transparent" : "bg-[#601feb]"
          )}
        >
          {childBtn()}
        </button>
      </div>
    </form>
  )
}

export function FormAdd() {
  const [formState, action] = useFormState(createTask, EMPTY_FORM_STATE)

  return <AbstractForm initialValues={{ name: "" }} formState={formState} action={action} />
}

export function FormEdit(props: { data: TaskEntity; closeDialog: () => void }) {
  const { data, closeDialog } = props
  const [formState, action] = useFormState(updateTask, EMPTY_FORM_STATE)

  return (
    <AbstractForm
      initialValues={{ ...data }}
      isEdit
      formState={formState}
      action={action}
      closeDialog={closeDialog}
    />
  )
}
