import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface ScrollDownButtonProps {
  href: string;
  label?: string;
}

/**
 * Indicador visual de "role para baixo" exibido no final do hero.
 *
 * Acessibilidade:
 * - `aria-label` descritivo (o texto do link é decorativo).
 * - Apenas o contêiner tem `animate-bounce`; a duplicata no ícone foi
 *   removida para evitar acumular animações sobre o mesmo elemento.
 * - A animação respeita `prefers-reduced-motion` via CSS global.
 */
export function ScrollDownButton({
  href,
  label = "Rolar para a próxima seção",
}: ScrollDownButtonProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none">
      <Link
        href={href}
        aria-label={label}
        className="group inline-flex items-center justify-center rounded-full p-1"
      >
        <ChevronDown
          className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

export default ScrollDownButton;
