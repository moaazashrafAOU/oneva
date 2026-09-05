import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'ONEVA | شريك واحد لكل احتياجات التوريد',description:'ONEVA شريكك للمشتريات والتوريد التشغيلي في مصر. عطارة وأعشاب، بقوليات، خضروات وفواكه، ومستلزمات تعبئة وتغليف. اطلب عرض سعر عبر واتساب.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>;}
