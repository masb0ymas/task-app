import _ from "lodash"
import { NextRequest, NextResponse } from "next/server"
import prisma from "~/lib/prisma"

/**
 * GET Task
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const page = query.get("page")
  const pageSize = query.get("pageSize")

  console.log(page, pageSize)

  const result = await prisma.task.findMany()
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

  const result = await prisma.task.create({
    data: { name: name },
  })

  return NextResponse.json({ message: "data has been added", result }, { status: 201 })
}
