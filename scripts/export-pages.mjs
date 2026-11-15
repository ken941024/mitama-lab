import{mkdir,readdir,readFile,writeFile}from'node:fs/promises';
import path from'node:path';
const output=path.resolve(process.argv[2]||'pages');await mkdir(output,{recursive:true});
for(const item of await readdir('dist',{withFileTypes:true})){if(!item.isFile())continue;let s=await readFile('dist/'+item.name,'utf8');
 if(item.name==='app.js'){
  s="const STATIC_PAGES=true;\n"+s;
  s=s.replace("const token=++heroRequest;renderHeroDetail", "const token=++heroRequest;renderHeroDetail");
  s=s.replace("showDetail,roleNames});try{const r=await fetch('/api/hero/'", "showDetail,roleNames});if(STATIC_PAGES)return;try{const r=await fetch('/api/hero/'");
  s=s.replace("async function refresh(manual=false){", "async function refresh(manual=false){if(STATIC_PAGES){$('#syncState').textContent='GitHub Pages 公開版：使用已整理資料快照；更新須重新發佈，不提供伺服器即時擷取。';if(manual)toast('目前為公開快照版，請查看下方來源與核對日期');return;}");
  s=s.replace("$('#refresh').onclick=async()=>{refresh(true);try", "$('#refresh').onclick=async()=>{if(STATIC_PAGES){await refresh(true);return;}refresh(true);try");
  s=s.replaceAll(/fetch\('\/(?!api\/)/g,"fetch('./");
  s=s.replaceAll("'/fallback.svg'","'./fallback.svg'");
 }
 if(item.name==='index.html'){
  s=s.replaceAll('href="/','href="./').replaceAll('src="/','src="./');
  s=s.replace('Sites 保存網站程式、內建圖鑑快照與版本原始碼；更新索引在網站執行平臺快取一小時。目前未建立用戶資料庫。','GitHub 公開儲存庫保存網站程式與資料快照，GitHub Pages 提供公開網頁。目前未建立用戶資料庫。');
  s=s.replace('開啟網站時會嘗試擷取基本索引（伺服器快取一小時），失敗時保留上次成功資料。這是索引更新，不會自動把攻略、技能文字或其他伺服器調整變成已驗證的亞洲版戰鬥規則。','這是 GitHub Pages 公開快照版，更新須維護者重新整理來源並發佈。下列日期是資料核對日期，不代表全部技能都已完成亞洲版實測。');
  s=s.replace('檢查官方資訊與索引 ↻','查看快照更新狀態 ↻');
  s=s.replace('本機：專案資料夾 mitama-lab；圖鑑快照是 dist/catalogue.json，程式碼亦保留在本機。資料夾位於你的 OneDrive 目錄內，是否同步由 OneDrive 設定決定。','本機：維護者保留程式與資料快照；公開網頁的資料檔是 catalogue.json 與 hero-details.json。');
 }
 await writeFile(path.join(output,item.name),s);
}
await writeFile(path.join(output,'.nojekyll'),'');console.log('Pages export ready: '+output);
