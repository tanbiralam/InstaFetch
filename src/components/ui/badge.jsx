import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        instagram: "border-transparent bg-social-instagram text-white hover:bg-social-instagram/80",
        instagramPastel: "border-transparent bg-social-instagramPastel text-social-instagram hover:bg-social-instagramPastel/80",
        facebook: "border-transparent bg-social-facebook text-white hover:bg-social-facebook/80",
        facebookPastel: "border-transparent bg-social-facebookPastel text-social-facebook hover:bg-social-facebookPastel/80",
        twitter: "border-transparent bg-social-twitter text-white hover:bg-social-twitter/80",
        twitterPastel: "border-transparent bg-social-twitterPastel text-social-twitter hover:bg-social-twitterPastel/80",
        youtube: "border-transparent bg-social-youtube text-white hover:bg-social-youtube/80",
        youtubePastel: "border-transparent bg-social-youtubePastel text-social-youtube hover:bg-social-youtubePastel/80",
        tiktok: "border-transparent bg-social-tiktok text-white hover:bg-social-tiktok/80",
        tiktokPastel: "border-transparent bg-social-tiktokPastel text-social-tiktok hover:bg-social-tiktokPastel/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  ...props
}) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants } 