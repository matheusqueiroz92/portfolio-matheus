'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { useLocale } from '@/providers/locale-provider'

interface BackButtonProps {
  href: string
  label: string
}

export function BackButton({ href, label }: BackButtonProps) {
  const { dictionary } = useLocale()

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {dictionary.common.backTo} {label}
    </Link>
  )
}
