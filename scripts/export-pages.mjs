import{mkdir,readdir,readFile,writeFile}from'node:fs/promises';
import path from'node:path';
const output=path.resolve(process.argv[2]||'docs');await mkdir(output,{recursive:true});
for(const item of await readdir('dist',{withFileTypes:true})){
 if(!item.isFile())continue;
 let s=await readFile('dist/'+item.name,'utf8');
 if(item.name==='app.js')s=s.replaceAll("'/fallback.svg'","'./fallback.svg'");
 if(item.name==='index.html')s=s.replaceAll('href="/','href="./').replaceAll('src="/','src="./');
 await writeFile(path.join(output,item.name),s);
}
await writeFile(path.join(output,'.nojekyll'),'');console.log('Pages export ready: '+output);
