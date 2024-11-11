"use client"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import IconLoader from "~/components/icon/loader"
import useInfiniteTask from "~/data/query/useInfiniteTask"
import ListItem from "./ListItem"

export function List() {
  const { ref, inView } = useInView()
  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteTask()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center">
        <IconLoader />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center">
        <span>Error: {error.message}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[24px] p-[16px]">
      <div className="w-full items-center">
        <div className="flex flex-col gap-[12px]">
          {data.pages?.map((page) => (
            <React.Fragment key={page.pageId}>
              {page.data.map((item) => (
                <ListItem {...item} key={item.id} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div ref={ref} className="flex justify-center items-center">
        {isFetchingNextPage && <IconLoader />}
      </div>
    </div>
  )
}
