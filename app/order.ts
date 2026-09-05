import { products } from './products';
import {getProducts,translate,type Language} from './i18n';
export const normalizeSearch=(text:string)=>text.replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[\u064B-\u065F\u0670]/g,'').trim().toLowerCase();
export function sanitizeCart(value:unknown):Record<string,number>{if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([id,q])=>products.some(p=>p.id===id)&&typeof q==='number'&&Number.isInteger(q)&&q>0&&q<=999));}
export function buildWhatsAppUrl(phone:string,text:string){const digits=phone.replace(/[\s+()-]/g,'');if(!/^[1-9]\d{7,14}$/.test(digits))return null;return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;}
export function makeOrderMessage(cart:Record<string,number>,details:{name:string;business:string;notes:string},language:Language='ar'){
 const t=(text:string)=>translate(text,language);
 return [t('مرحباً ONEVA، أود طلب عرض سعر للأصناف التالية:'),'',...getProducts(language).filter(p=>cart[p.id]).map((p,i)=>`${i+1}. ${p.name}${p.pack?` (${p.pack})`:''} — ${cart[p.id]} ${p.unit}`),'',details.name.trim()?`${t('الاسم:')} ${details.name.trim()}`:'',details.business.trim()?`${t('الشركة / النشاط:')} ${details.business.trim()}`:'',details.notes.trim()?`${t('ملاحظات:')} ${details.notes.trim()}`:'',t('يرجى تأكيد الأسعار والتوفّر والمواصفات وموعد التوريد.')].filter((line,i,arr)=>line||arr[i-1]).join('\n');
}
