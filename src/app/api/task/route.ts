import _ from "lodash"
import { NextRequest, NextResponse } from "next/server"
import prisma from "~/lib/prisma"
import { validate } from "~/lib/validate"

/**
 * GET Task
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const page = validate.number(query.get("page")) || 1
  const pageSize = validate.number(query.get("pageSize")) || 10

  const skip = pageSize * (page - 1)
  const take = pageSize

  const result = await prisma.task.findMany({
    skip: skip,
    take: take,
  })
  const total = await prisma.task.count()

  return NextResponse.json(
    { message: "data has been received", data: result, total: total },
    { status: 200 }
  )
}

/**
 * POST Task
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  const formData = await req.json()
  const name = _.get(formData, "name", "")
  const is_finished = _.get(formData, "is_finished", false)

  const result = await prisma.task.create({
    data: {
      name: name,
      is_finished: validate.boolean(is_finished),
    },
  })

  return NextResponse.json({ message: "data has been added", result }, { status: 201 })
}
