"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { TaskEntity } from "../entity/task"

interface UseResult {
  data: TaskEntity[]
  total: number
  pageId: number
}

type TQueryFnData = UseResult

export default function useInfiniteTask() {
  const endpoint = `/api/task`

  const query = useInfiniteQuery<TQueryFnData>({
    queryKey: ["task", endpoint],
    queryFn: async ({ pageParam }) => {
      const result = await axios.get(`${endpoint}?page=${pageParam}&pageSize=10`)
      return { ...result.data, pageId: pageParam }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total ? allPages.length + 1 : undefined
    },
  })

  console.log("QUERY DATA", query.data)

  return query
}
