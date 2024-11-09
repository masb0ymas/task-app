import _ from "lodash"
import { NextRequest, NextResponse } from "next/server"
import prisma from "~/lib/prisma"

type ContextParams = {
  params: { id: string }
}

/**
 * GET Task
 * @param _req
 * @param context
 * @returns
 */
export async function GET(_req: NextRequest, context: ContextParams) {
  const { params } = context

  const result = await prisma.task.findFirst({
    where: { id: String(params.id) },
  })

  if (!result) {
    return NextResponse.json({ message: "task not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "data has been received", data: result }, { status: 200 })
}

/**
 * UPDATE Task
 * @param req
 * @param context
 * @returns
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  const { params } = context

  const formData = await req.json()
  const name = _.get(formData, "name", "")
  const is_finished = _.get(formData, "is_finished", false)

  const getTask = await prisma.task.findFirst({
    where: { id: String(params.id) },
  })

  if (!getTask) {
    return NextResponse.json({ message: "task not found" }, { status: 404 })
  }

  const result = await prisma.task.update({
    where: { id: String(params.id) },
    data: {
      name: name,
      is_finished: Boolean(is_finished),
    },
  })

  return NextResponse.json({ message: "data has been updated", data: result }, { status: 200 })
}

/**
 * DELETE Task
 * @param _req
 * @param context
 * @returns
 */
export async function DELETE(_req: NextRequest, context: ContextParams) {
  const { params } = context

  const getTask = await prisma.task.findFirst({
    where: { id: String(params.id) },
  })

  if (!getTask) {
    return NextResponse.json({ message: "task not found" }, { status: 404 })
  }

  await prisma.task.delete({
    where: { id: String(params.id) },
  })

  return NextResponse.json({ message: "data has been deleted" }, { status: 200 })
}
