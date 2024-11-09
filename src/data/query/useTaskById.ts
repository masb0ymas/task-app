"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { TaskEntity } from "../entity/task"

type UseResult = TaskEntity
type TQueryFnData = UseResult
type TError = any

export default function useTaskById(id: string, options?: UseQueryOptions<TQueryFnData, TError>) {
  const endpoint = `/api/task/${id}`

  const query = useQuery<TQueryFnData, TError>({
    queryKey: ["task-by-id", endpoint],
    queryFn: async () => {
      const result = await axios.get(endpoint)
      return result.data
    },
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    select: (res: any) => res?.data,
    ...options,
  })

  return {
    ...query,
  }
}
