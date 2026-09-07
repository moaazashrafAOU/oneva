const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../dist/client');
for(const route of ['catalog','about','services','process','contact']){
 const source=path.join(root,route+'.html');
 if(!fs.existsSync(source))throw Error(route+' export is missing');
 fs.mkdirSync(path.join(root,route),{recursive:true});
 fs.copyFileSync(source,path.join(root,route,'index.html'));
}
console.log('All static route entries verified.');
