interface IconShadcnProps {
  size: number
  className?: string
}

export function IconShadcn({ size, className }: IconShadcnProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="25"
      strokeLinecap="round"
      className={className}
    >
      <title>shadcn/ui</title>
      <line x1="208" y1="128" x2="128" y2="208" />
      <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
  )
}
