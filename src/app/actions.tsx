"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { taskSchema } from "~/data/schema/task"
import prisma from "~/lib/prisma"
import { validate } from "~/lib/validate"
import { FormState, fromErrorToFormState, toFormState } from "~/lib/zod"

/**
 * Create Task Action
 * @param _formState
 * @param formData
 * @returns
 */
export async function createTask(_formState: FormState, formData: FormData) {
  const name = formData.get("name") as string
  const is_finished = validate.boolean(formData.get("is_finished") as string)

  console.log(formData, name, is_finished)

  try {
    const values = taskSchema.parse({ name, is_finished })

    await prisma.task.create({
      data: {
        name: values.name,
        is_finished: validate.boolean(values.is_finished),
      },
    })
  } catch (error) {
    console.log(error)
    return fromErrorToFormState(error)
  }

  revalidatePath("/")
  return toFormState("SUCCESS", "data has been created")
}

/**
 * Update Task Action
 * @param _formState
 * @param formData
 * @returns
 */
export async function updateTask(_formState: FormState, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const is_finished = validate.boolean(formData.get("is_finished") as string)

    const values = taskSchema.parse({ name, is_finished })

    await prisma.task.update({
      where: { id: id },
      data: {
        name: values.name,
        is_finished: validate.boolean(values.is_finished),
      },
    })
  } catch (error) {
    console.log(error)
    return fromErrorToFormState(error)
  }

  revalidatePath("/")
  return toFormState("SUCCESS", "data has been updated")
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id: id },
    })
  } catch (error) {
    console.log(error)
    return fromErrorToFormState(error)
  }

  revalidatePath("/")
  return toFormState("SUCCESS", "data has been deleted")
}
