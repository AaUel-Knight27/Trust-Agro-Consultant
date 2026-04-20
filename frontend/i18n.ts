import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

const locales = ['en', 'am'] as const
const defaultLocale = 'en'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(locales, requested) ? requested : defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
