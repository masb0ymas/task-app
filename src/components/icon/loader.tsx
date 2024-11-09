import React from "react"

export default function IconLoader() {
  return (
    <svg className="animate-spin" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4.78443 16C4.78443 22.1942 9.80581 27.2156 16 27.2156C22.1942 27.2156 27.2156 22.1942 27.2156 16C27.2156 9.80581 22.1942 4.78443 16 4.78443C9.80581 4.78443 4.78443 9.80581 4.78443 16Z"
        fill="url(#paint0_angular_0_217)"
      />
      <circle cx="16.16" cy="29.6" r="2.4" fill="#601FEB" />
      <defs>
        <radialGradient
          id="paint0_angular_0_217"
          cx="0"
          cy="1"
          r="2"
          // gradientUnits="userSpaceOnUse"
          // gradientTransform="translate(16 16) rotate(90) scale(16)"
        >
          <stop stopColor="#601FEB" />
          <stop offset="0.175675" stopColor="#601FEB" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
