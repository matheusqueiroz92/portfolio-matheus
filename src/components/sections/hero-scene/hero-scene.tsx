"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { Color, MathUtils } from "three";

/**
 * Ornamento 3D discreto para a hero.
 *
 * Intenção: "órbita editorial" — dois anéis finos cruzados girando lentamente,
 * com alguns nós luminosos. Fica **contido atrás da foto** (sem vazar para o
 * texto) e apoia em vez de competir com o retrato.
 *
 * - Cor derivada de `--primary` para reagir ao tema claro/escuro.
 * - `prefers-reduced-motion` → pose estática, sem rotação nem parallax.
 * - `aria-hidden` no wrapper: puramente decorativo.
 */

function OrbitRings({ primaryColor }: { primaryColor: string }) {
  const groupRef = useRef<Group>(null);
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function handlePointer(event: PointerEvent) {
      // Normaliza para [-1, 1] — parallax muito sutil.
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    if (!prefersReducedMotion.current) {
      window.addEventListener("pointermove", handlePointer, { passive: true });
    }
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current || !ringARef.current || !ringBRef.current) return;

    if (prefersReducedMotion.current) {
      // Pose estática agradável.
      groupRef.current.rotation.set(0.2, 0.35, 0);
      ringARef.current.rotation.x = Math.PI / 2;
      ringBRef.current.rotation.x = Math.PI / 2;
      ringBRef.current.rotation.y = Math.PI / 3;
      return;
    }

    // Giro lento de cada anel, em eixos complementares.
    ringARef.current.rotation.z += delta * 0.12;
    ringBRef.current.rotation.z -= delta * 0.08;

    // Parallax suave do grupo inteiro (~4° máximo).
    const targetY = pointerRef.current.x * 0.07;
    const targetX = pointerRef.current.y * -0.05;
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.04,
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.04,
    );
  });

  const color = new Color(primaryColor);

  return (
    <group ref={groupRef}>
      {/* Anel principal, inclinado. */}
      <mesh ref={ringARef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.45, 0.008, 16, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>

      {/* Anel secundário, cruzado em outro eixo. */}
      <mesh ref={ringBRef} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <torusGeometry args={[1.2, 0.006, 16, 140]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* Nó central muito sutil — âncora visual. */}
      <mesh>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Lê o valor vivo de uma CSS custom property em `:root`, reagindo à troca de
 * tema (next-themes muda o atributo `class` no <html>).
 */
function useCssVarColor(varName: string, fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    function read() {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      if (value) setColor(value);
    }
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    return () => observer.disconnect();
  }, [varName]);

  return color;
}

export function HeroScene() {
  // Fallback casa com o `--primary` do tema escuro (default) para estabilizar
  // o primeiro render antes da leitura da CSS var.
  const primaryColor = useCssVarColor("--primary", "#60a5fa");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <OrbitRings primaryColor={primaryColor} />
      </Canvas>
    </div>
  );
}
