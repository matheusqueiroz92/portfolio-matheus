"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

/**
 * Botão flutuante para voltar ao topo. Aparece quando o rodapé entra na
 * viewport, para não competir com o conteúdo durante a leitura.
 *
 * Acessibilidade:
 * - `aria-label` descreve a ação para leitores de tela.
 * - Quando invisível, o botão fica inacessível via teclado (`tabIndex={-1}`
 *   e `aria-hidden`), evitando foco em um alvo fora da tela.
 * - A animação de transição respeita `prefers-reduced-motion` via CSS global.
 */
export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Exibe somente quando o rodapé começa a aparecer na viewport.
      const isFooterVisible =
        footerRect.top < windowHeight && footerRect.bottom > 0;

      setIsVisible(isFooterVisible);
    };

    // Verifica no momento da montagem.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <Link
      href="#inicio"
      aria-label="Voltar ao topo da página"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-500 hover:scale-110 active:scale-95 group ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={28} aria-hidden="true" />
    </Link>
  );
}

export default ScrollTopButton;
