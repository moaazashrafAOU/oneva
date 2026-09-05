import type {Metadata} from 'next';
import Site from '../site';
export const metadata:Metadata={title:'كتالوج المنتجات | ONEVA',description:'تصفح منتجات ONEVA واطلب عرض سعر. Browse ONEVA products and request a quotation.'};
export default function Catalog(){return <Site view="catalog"/>;}
