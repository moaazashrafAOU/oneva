'use client';
import { MessageCircle, ArrowUpLeft } from 'lucide-react';
import { buildWhatsAppUrl } from './order';
import type { Language } from './i18n';

export default function WhatsAppContact({ language, phone, hasCart }: { language: Language; phone: string; hasCart: boolean }) {
  const ar = language === 'ar';
  const say = (arabic: string, english: string) => ar ? arabic : english;
  return <>
    <section className="section container inquiry-section" id="contact" aria-labelledby="inquiry-title">
      <div><div className="eyebrow dark">{say('تواصل معنا', 'Contact us')}</div><h2 id="inquiry-title">{say('احكي لنا عن احتياجاتك.', 'Tell us what you need.')}</h2><p>{say('املأ البيانات وافتح رسالتك على واتساب، ثم اضغط إرسال.', 'Fill in your details, open your message in WhatsApp, then press Send.')}</p><a href={`tel:+${phone.replace(/\D/g, '')}`} dir="ltr">+20 12 73348080</a></div>
      <form className="customer-fields inquiry-form" onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const fields = [say('مرحباً ONEVA، لدي استفسار عن التوريد.', 'Hello ONEVA, I have a supply inquiry.'), ...[['name', say('الاسم', 'Name')], ['mobile', say('الموبايل', 'Phone')], ['business', say('الشركة', 'Company')], ['message', say('الرسالة', 'Message')]].map(([key, label]) => {
          const entry = data.get(key);
          const value = typeof entry === 'string' ? entry.trim() : '';
          return value ? `${label}: ${value}` : '';
        })].filter(Boolean).join('\n');
        const url = buildWhatsAppUrl(phone, fields);
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      }}>
        <label>{say('الاسم', 'Name')}<input name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" /></label>
        <label>{say('رقم الموبايل', 'Phone number')}<input name="mobile" type="tel" autoComplete="tel" dir="ltr" required maxLength={25} pattern="[+0-9٠-٩۰-۹ ()-]{7,25}" /></label>
        <label>{say('اسم الشركة أو النشاط (اختياري)', 'Company or business (optional)')}<input name="business" autoComplete="organization" maxLength={150} /></label>
        <label>{say('رسالتك أو احتياجات التوريد', 'Your message or supply requirements')}<textarea name="message" rows={4} required maxLength={1200} /></label>
        <button className="button green" type="submit"><MessageCircle size={21}/>{say('إرسال على واتساب', 'Send via WhatsApp')}<ArrowUpLeft size={20}/></button>
      </form>
    </section>
    <a className={`floating-whatsapp${hasCart ? ' with-cart' : ''}`} href={buildWhatsAppUrl(phone, say('مرحباً ONEVA، أود الاستفسار عن خدمات التوريد.', 'Hello ONEVA, I would like to ask about your supply services.')) || undefined} target="_blank" rel="noopener noreferrer" aria-label={say('تواصل على واتساب: +20 12 73348080', 'Chat on WhatsApp: +20 12 73348080')}><MessageCircle size={25}/><span>{say('واتساب', 'WhatsApp')}</span></a>
  </>;
}
