import{readFile,writeFile}from'node:fs/promises';
const c=JSON.parse(await readFile('dist/catalogue.json','utf8'));
const refs=JSON.parse(await readFile('dist/skill-reference.json','utf8')).records;
const rows=(await readFile('content/hero-guides.tsv','utf8')).trim().split('\n').map(l=>l.split('|'));
const decisions=Object.fromEntries((await readFile('content/soul-decisions.tsv','utf8')).trim().split('\n').map(l=>{const[id,...notes]=l.split('|');return[id,notes]}));
const guides={},souls=new Map(c.souls.map(s=>[s.name,s.id]));
for(const r of rows){
 if(r.length!==7)throw Error('教學欄位數目錯誤：'+r[0]);
 const[idText,purpose,setsText,main,rotation,partnerAdvice,pitfall]=r,id=Number(idText),h=c.heroes.find(h=>h.id===id);
 if(!h||guides[id]||!refs[id]?.skills.length)throw Error('重複、缺來源或未知式神：'+id);
 const sets=setsText.split(','),ids=sets.filter(s=>!['散件','不指定'].includes(s)).map(s=>{if(!souls.has(s))throw Error('未知御魂：'+s);return souls.get(s)});
 guides[id]={id,title:h.name+' · '+purpose,origin:'editorial',purpose,sets,setNotes:decisions[id]||[],main,rotation,partnerAdvice,pitfall,cases:[{title:purpose,souls:ids,two:[],text:rotation}],partners:c.heroes.filter(x=>x.id!==id&&partnerAdvice.includes(x.name)&&x.name.length>1).map(x=>({id:x.id,text:partnerAdvice})),sources:[{title:'國服官方技能參考（不是亞洲版逐條驗證）',url:refs[id].urls[0]}],limit:'配搭為按技能整理的編輯建議；亞洲實裝與技能版本另列，不宣稱所有場合的唯一最優解。',reviewedAt:'2026-11-15',collectionOnly:setsText==='不指定'};
}
for(const[id,notes]of Object.entries(decisions))if(!guides[id]||notes.length!==guides[id].sets.length)throw Error('御魂取捨與選項不一致：'+id);
if(Object.keys(guides).length!==c.heroes.length)throw Error('尚有式神未編寫教學');
await writeFile('dist/hero-guides.js','// Individually authored guides; no role-based generated recommendations.\nexport const heroGuides='+JSON.stringify(guides)+';\n');
console.log('Compiled '+rows.length+' individually authored guides.');
