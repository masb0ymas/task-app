import { z } from "zod"

export const taskSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(2, `name can't be empty`),
})
