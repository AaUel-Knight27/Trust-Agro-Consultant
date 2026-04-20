"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { useTranslations } from 'next-intl'

const faqs = [
  {
    q: "What sets Trust Agro Consulting apart?",
    a: "Trust Agro Consulting stands out through decades of veterinary expertise combined with a client-first approach. Our team of skilled agronomists and specialists deliver tailored solutions for each farm's unique challenges.",
  },
  {
    q: "How does Trust Agro approach client relationships?",
    a: "We build lasting partnerships based on trust and transparency. Every client receives open communication, personalized attention, and a deep commitment to understanding their specific farming needs.",
  },
  {
    q: "What services does Trust Agro offer?",
    a: "We offer a full suite of agro advisory services including consulting, training, veterinary care, animal feed supply, farm product sales, and animal husbandry equipment — covering every aspect of modern farming.",
  },
  {
    q: "How does Trust Agro stay current with industry trends?",
    a: "Our team actively engages with the latest research, attends professional development programs, and collaborates with agricultural institutions to bring clients the most effective and up-to-date farming practices.",
  },
] as const

export function FAQSection() {
  const t = useTranslations('faq')

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-3xl space-y-10">
        <SectionHeader tag={t('tag')} title={t('title')} centered />

        <Accordion multiple={false} defaultValue={[]}>
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
