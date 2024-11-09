"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import useUrlQuery, { UseUrlQueryOptions } from "~/lib/hooks/useUrlQuery"
import { TaskEntity } from "../entity/task"

interface UseResult {
  data: TaskEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useTask(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const endpoint = `/api/task?`
  const urlQuery = useUrlQuery(urlOptions)

  const query = useQuery<TQueryFnData, TError>({
    queryKey: urlQuery.transformKey(["task", endpoint]),
    queryFn: async () => {
      const result = await axios.get(urlQuery.transformUrl(endpoint))
      return result.data
    },
    ...options,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    ...query,
    data: query.data?.data || [],
    total: query.data?.total || 0,
  }
}
