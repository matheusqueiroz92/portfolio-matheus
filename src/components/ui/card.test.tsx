import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descrição</CardDescription>
          <CardAction>Ação</CardAction>
        </CardHeader>
        <CardContent>Conteúdo</CardContent>
        <CardFooter>Rodapé</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Título')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Descrição')).toHaveAttribute('data-slot', 'card-description')
    expect(screen.getByText('Conteúdo')).toHaveAttribute('data-slot', 'card-content')
    expect(screen.getByText('Rodapé')).toHaveAttribute('data-slot', 'card-footer')
  })
})
