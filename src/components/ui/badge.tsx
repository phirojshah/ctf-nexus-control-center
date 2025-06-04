import * as React from "react"
import { cn } from "@/lib/utils"
import { badgeVariants, type BadgeProps } from "./badge.config"

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
