import { cookies } from 'next/headers'

import { resolveLocale, type Locale } from '@/i18n'
import { LOCALE_COOKIE_KEY } from '@/lib/locale-storage'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return resolveLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value)
}
