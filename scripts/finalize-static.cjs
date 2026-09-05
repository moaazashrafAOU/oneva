// Support /catalog/ on static hosts that do not resolve extensionless HTML.
const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'../dist/client');
if(!fs.existsSync(path.join(root,'catalog.html')))throw Error('Catalog export is missing');
fs.mkdirSync(path.join(root,'catalog'),{recursive:true});
fs.copyFileSync(path.join(root,'catalog.html'),path.join(root,'catalog/index.html'));
console.log('Static catalog directory entry verified.');
