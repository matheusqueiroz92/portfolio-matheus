import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import { contactFormSchema } from '@/lib/contact-schema'

/**
 * Route handler para o formulário de contato.
 *
 * Recebe JSON `{ name, email, message }` do `<ContactSection />`, valida
 * com o mesmo schema Zod usado no cliente e dispara o envio via Resend.
 *
 * A API key do Resend (`RESEND_API_KEY`) é lida apenas no servidor — por
 * isso a migração exige esta rota: o EmailJS antigo rodava direto no
 * navegador com `NEXT_PUBLIC_*`, o Resend não.
 *
 * Resposta:
 *  - 200 `{ ok: true }` em sucesso
 *  - 400 `{ error, issues? }` em falha de validação
 *  - 500 `{ error }` em falha de entrega ou configuração ausente
 */
export async function POST(request: Request) {
  // 1. Parse seguro do body — payload malformado retorna 400 sem vazar stack trace.
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  // 2. Validação com o schema compartilhado — mesmas regras do cliente.
  const parsed = contactFormSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Dados inválidos.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { name, email, message } = parsed.data

  // 3. Configuração obrigatória. Falhar cedo e com mensagem clara — evita
  //    deploys "quase funcionando" com a chave esquecida.
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.RESEND_TO_EMAIL

  if (!apiKey || !fromEmail || !toEmail) {
    console.error('[api/contact] Resend env vars ausentes.')
    return NextResponse.json(
      { error: 'Serviço de e-mail não configurado.' },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  // 4. Template inline — simples, sem dependências extras. O `reply_to`
  //    aponta para o remetente do formulário, então responder no Gmail
  //    vai direto para quem preencheu, sem precisar copiar/colar.
  const subject = `Novo contato pelo portfólio — ${name}`
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0f172a;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">Nova mensagem do portfólio</h2>
      <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <p style="margin: 0 0 8px;"><strong>Mensagem:</strong></p>
      <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
      <p style="margin: 0; font-size: 12px; color: #64748b;">
        Enviado via formulário em matheusqueiroz.dev.br
      </p>
    </div>
  `

  const text = [
    'Nova mensagem do portfólio',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    '',
    'Mensagem:',
    message,
  ].join('\n')

  // 5. Envio. O SDK do Resend devolve `{ data, error }` em vez de lançar —
  //    então checamos `error` explicitamente antes de responder sucesso.
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject,
    html,
    text,
  })

  if (error) {
    console.error('[api/contact] Resend error:', error)
    return NextResponse.json(
      { error: 'Não foi possível enviar a mensagem. Tente novamente.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

/**
 * Escape mínimo de HTML — suficiente para o corpo do e-mail, onde o único
 * conteúdo dinâmico são os campos do formulário já validados pelo Zod.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
