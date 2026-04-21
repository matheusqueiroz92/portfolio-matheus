interface IconFramerMotionProps {
  size: number
  className?: string
}

/**
 * Logo canônico da Framer: três paralelogramos formando um "F" anguloso.
 * Mantemos `fill="currentColor"` para o ícone seguir a paleta (primary).
 */
export function IconFramerMotion({ size, className }: IconFramerMotionProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <title>Framer Motion</title>
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  )
}
