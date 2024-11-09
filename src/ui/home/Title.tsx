"use client"

import React from "react"

export default function Title() {
  return (
    <div className="flex flex-col gap-[4px] justify-center items-center">
      <h1 className="font-semibold text-[40px] leading-[60px]">{`Let's Get Things Done!`}</h1>
      <h3 className="font-normal text-[20px] leading-[36px] text-[#444444]">
        One Step Closer to Your Goals
      </h3>
    </div>
  )
}
