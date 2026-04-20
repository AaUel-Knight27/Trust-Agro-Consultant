'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'am' : 'en'
    const newPath = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${newPath}`)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-1.5 text-sm"
      title={locale === 'en' ? 'Switch to Amharic' : 'Switch to English'}
    >
      <Languages size={15} />
      {locale === 'en' ? 'አማ' : 'EN'}
    </Button>
  )
}
