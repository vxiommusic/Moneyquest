"use client"

import * as React from "react"

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value?: number;
}

export function CircularProgress({ value = 0, ...props }: CircularProgressProps) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className="transform -rotate-90"
      {...props}
    >
      <circle
        cx="20"
        cy="20"
        r={radius}
        strokeWidth="4"
        className="stroke-muted"
        fill="transparent"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-primary transition-all duration-300"
        fill="transparent"
      />
    </svg>
  );
}
