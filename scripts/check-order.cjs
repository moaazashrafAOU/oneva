const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');const assert=require('node:assert/strict');const ts=require('typescript');
const cache={};function load(name){if(cache[name])return cache[name];const filename=path.join(__dirname,'../app',name+'.ts');const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,require:(p)=>load(p.replace('./',''))},{filename});cache[name]=module.exports;return module.exports;}
const {products,categories}=load('products');const {sanitizeCart,buildWhatsAppUrl,makeOrderMessage,normalizeSearch}=load('order');
assert.equal(products.length,41);assert.equal(new Set(products.map(p=>p.id)).size,41);assert.equal(categories.length,4);
assert.deepEqual(Array.from(categories,c=>products.filter(p=>p.category===c.id).length),[17,6,7,11]);
assert.ok(products.every(p=>p.image>=0&&p.image<36&&p.unit&&p.name));
assert.equal(JSON.stringify(sanitizeCart({p1:3,p2:-2,p3:1.5,p4:1000,unknown:2,p5:'3'})),JSON.stringify({p1:3}));
for(const value of [null,[],42,'broken'])assert.equal(JSON.stringify(sanitizeCart(value)),'{}');
assert.equal(normalizeSearch('أرز'),normalizeSearch('ارز'));assert.equal(normalizeSearch('فلفل أسود'),normalizeSearch('فلفل اسود'));
const msg=makeOrderMessage({p1:2,p31:3,p41:1},{name:'أحمد',business:'مطعم & شركة',notes:'موعد الخميس\nعبوات خاصة'});
assert.ok(msg.includes('كمون مصري — 2 كجم'));assert.ok(msg.includes('٢٠ كيس × ١٠٠ قطعة'));assert.ok(msg.includes('3 كرتونة'));assert.ok(msg.includes('جوانتي جلد — 1 وحدة'));assert.ok(msg.includes('مطعم & شركة'));
const link=buildWhatsAppUrl('+20 1012345678',msg);assert.equal(new URL(link).searchParams.get('text'),msg);assert.ok(link.startsWith('https://wa.me/201012345678?text='));
for(const phone of ['', 'abc','0123456789','123','https://bad.example'])assert.equal(buildWhatsAppUrl(phone,msg),null);
console.log('PASS: 41 products, 4 category counts, quantities/storage validation, Arabic search, exact WhatsApp message encoding and unconfigured-number protection. No messages sent.');
