"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { TaskEntity } from "../entity/task"
import { useState } from "react"

interface UseResult {
  data: TaskEntity[]
  total: number
  pageId: number
}

type TQueryFnData = UseResult

export default function useInfiniteTask() {
  const query = useInfiniteQuery<TQueryFnData>({
    queryKey: ["task"],
    queryFn: async ({ pageParam }) => {
      const result = await axios.get(`/api/task?page=${pageParam}&pageSize=10`)
      return { ...result.data, pageId: pageParam }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total ? allPages.length + 1 : undefined
    },
  })

  return query
}
