"use client"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import IconLoader from "~/components/icon/loader"
import useInfiniteTask from "~/data/query/useInfiniteTask"
import ListItem from "./ListItem"

export function List() {
  const { ref, inView } = useInView()
  const { data, error, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteTask()

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

      <div className="flex justify-center items-center">
        <button
          ref={ref}
          className="rounded-[120px] w-40 px-[32px] h-[52px] text-base font-semibold text-primary-foreground bg-[#601feb]"
        >
          {isFetchingNextPage ? (
            <IconLoader />
          ) : hasNextPage ? (
            "Load Newer"
          ) : (
            "Nothing more to load"
          )}
        </button>
      </div>
    </div>
  )
}
