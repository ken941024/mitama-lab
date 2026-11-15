import{soulEffects}from'./soul-info.js';
import{tc,localize,ensureTraditionalUI}from'./traditional.js';
import{attachDetails}from'./catalogue-plans.js';
import{renderSoulDetail}from'./soul-detail.js';
import{applyAsiaEvidence,asiaEvidence,releaseLabel}from'./asia-evidence.js';
import{guidanceState}from'./hero-profiles.js';
import{renderHeroDetail}from'./hero-detail.js';
import{asiaHeroes,inRegion}from'./regions.js';
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],esc=x=>tc(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let catalogue={heroes:[],souls:[]},timer;let heroDetails={records:{}};let imageAudit={results:[]};let skillReference={records:{}};
const titles={heroes:['每一隻式神，<br>都有自己的打法。','按技能機制選用途，理解御魂取捨、操作順序與隊友分工。'],souls:['認識御魂，<br>再回到式神選配。','效果摘要與逐隻編寫的配搭交叉查閱。'],sources:['每份教學，<br>都保留依據。','分開顯示技能參考、編輯建議與亞洲實裝證據。']};
function navigate(){const id=location.hash.slice(1)||'heroes';if(!titles[id]){location.hash='heroes';return}all('.view').forEach(x=>x.classList.toggle('active',x.id===id));all('nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));$('#heading').innerHTML=titles[id][0];$('#subtitle').textContent=titles[id][1];$('#crumb').textContent=$(`nav button[data-tab="${id}"] span`).textContent}
all('nav button').forEach(x=>x.onclick=()=>{location.hash=x.dataset.tab});addEventListener('hashchange',navigate);navigate();
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
const roleNames={dps:'輸出',accelerator:'拉條',debuffer:'減益',pve:'PVE',pvp:'鬥技',shield:'護盾','fire-shiki':'鬼火干涉',collab:'聯動',decelerator:'推條',dispeller:'驅散',healer:'治療',support:'輔助',buffer:'增益',orber:'供火',recover:'恢復',revive:'復活',control:'控制'};
const types={'atk-bonus':'攻擊加成','crit-bonus':'暴擊加成','crit-dmg':'暴擊傷害','hp-bonus':'生命加成','def-bonus':'防禦加成','effect-hit':'效果命中','effect-res':'效果抵抗','random-stat':'特殊／首領'};
function imageTag(x,alt=''){return`<img src="${esc(x.image)}" alt="${esc(alt||x.name)}" loading="lazy" referrerpolicy="no-referrer">`}
function bindImages(root=document){root.querySelectorAll('img').forEach(img=>{img.onerror=()=>{img.onerror=null;img.src='/fallback.svg';img.alt+='（原圖暫時無法載入）'}})}
function renderHeroes(){const q=tc($('#heroSearch').value).trim().toLowerCase(),r=$('#rarity').value,t=$('#role').value,pool=inRegion(catalogue.heroes,$('#region').value),filtered=pool.filter(x=>(!q||(x.name+' '+x.en+' '+(x.sourceName||'')).toLowerCase().includes(q))&&(!r||x.rarity===r)&&(!t||x.tags.includes(t))&&(!$('#guideStatus').value||guidanceState(x,[]).kind===$('#guideStatus').value));$('#heroGrid').innerHTML=filtered.map(x=>`<button class="card" data-hero="${x.id}"><span class="rarity">${esc(x.rarity)}</span>${imageTag(x)}<strong>${esc(x.name)}</strong><small class="regionlabel">${esc(releaseLabel(x))}</small><small>${esc(guidanceState(x,[]).label)}</small></button>`).join('');$('#heroEmpty').hidden=filtered.length>0;$('#heroCoverage').textContent=`顯示 ${filtered.length} / ${pool.length} 筆 · ${$('#region').value==='reference'?'亞洲實裝待核對參考':'亞洲資料區（來源分級）'}`;bindImages($('#heroGrid'))}
function renderSouls(){const q=tc($('#soulSearch').value).trim().toLowerCase(),t=$('#soulType').value,filtered=catalogue.souls.filter(x=>(!q||(x.name+' '+x.en).toLowerCase().includes(q))&&(!t||x.type===t));$('#soulGrid').innerHTML=filtered.map(x=>`<button class="card" data-soul="${x.id}">${imageTag(x)}<strong>${esc(x.name)}</strong><small class="">${esc(types[x.type]||'特殊效果')}</small></button>`).join('');$('#soulCoverage').textContent=`顯示 ${filtered.length} / ${catalogue.souls.length} 筆`;bindImages($('#soulGrid'))}
function minis(items,kind){return`<div class="minirow">${items.map(x=>`<button data-${kind}="${x.id}">${imageTag(x)}${esc(x.name)}</button>`).join('')}</div>`}
function showDetail(content){$('#detailBody').innerHTML=content;bindImages($('#detailBody'));if(!$('#detail').open)$('#detail').showModal();$('#detail').scrollTop=0}
function heroDetail(id){renderHeroDetail(catalogue,id,{esc,imageTag,minis,showDetail,roleNames,skillReference});}
function soulDetail(id){renderSoulDetail(catalogue,id,{esc,imageTag,minis,showDetail});}

document.addEventListener('click',e=>{const h=e.target.closest('[data-hero]'),s=e.target.closest('[data-soul]');if(h)heroDetail(Number(h.dataset.hero));if(s)soulDetail(Number(s.dataset.soul))});$('#closeDetail').onclick=()=>$('#detail').close();$('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const r=$('#detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#detail').close()}});
for(const sel of ['#heroSearch','#rarity','#role','#region','#guideStatus'])$(sel).addEventListener('input',renderHeroes);for(const sel of ['#soulSearch','#soulType'])$(sel).addEventListener('input',renderSouls);
function installData(data,status){if(!Array.isArray(data.heroes)||!Array.isArray(data.souls)||data.heroes.length<100)throw Error('索引格式無效');data=localize(attachDetails(applyAsiaEvidence(data),heroDetails));catalogue=data;$('#siteAudit').innerHTML='<p>來源資料：'+Object.keys(heroDetails.records||{}).length+'／'+data.heroes.length+' 筆式神；技能索引：'+Object.values(heroDetails.records||{}).filter(x=>x.skills?.length).length+' 筆；御魂效果摘要：'+data.souls.filter(s=>soulEffects[s.id]).length+'／'+data.souls.length+' 種。</p><p>圖片網址檢查：'+imageAudit.results.filter(r=>r.ok).length+'／'+imageAudit.results.length+' 可存取（'+(imageAudit.checkedAt||'').slice(0,10)+' 檢查結果，不保證外部來源永久可用）。技能參考與編輯教學分開呈現。</p>';$('#heroCount').textContent=asiaHeroes(data.heroes).length;$('#soulCount').textContent=data.souls.length;const known=data.heroes.filter(x=>x.asiaListed).length;$('#coverage').innerHTML=`<div><b>${data.heroes.length}</b><span>官方國服索引條目</span></div><div><b>${data.souls.length}</b><span>社群御魂索引條目</span></div><div><b>${known}</b><span>亞洲資料區（官方／社群分級）</span></div><div><b>278</b><span>逐隻編寫的用途與配搭</span></div>`;$('#syncState').textContent=`${status} · 成功擷取：${new Date(data.checkedAt).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong'})}（香港時間）`;renderHeroes();renderSouls();const counts={profile:0,reference:0,generic:0,missing:0,unverified:0};data.heroes.forEach(x=>counts[guidanceState(x,[]).kind]++);$('#guideCounts').innerHTML=Object.entries({profile:'逐隻編寫的教學',reference:'技能參考待補教學',generic:'通用資料',missing:'教學待補',unverified:'亞洲實裝待核對（另附參考教學）'}).map(([k,v])=>'<span class="tag">'+v+'：'+counts[k]+'</span>').join('');$('#evidenceEntries').innerHTML=Object.entries(asiaEvidence).map(([id,x])=>'<li><a href="'+esc(x.source.url)+'" target="_blank" rel="noopener">'+esc(x.name)+' · '+esc(x.source.title)+' ↗</a></li>').join('')}
async function refresh(manual=false){$('#syncState').textContent='公開資料快照：逐隻技能參考與教學由維護者整理後發佈。';if(manual)toast('這是資料快照，請查看各式神的來源與核對日期');}
$('#refresh').onclick=()=>refresh(true);
ensureTraditionalUI();
async function optionalJson(path,fallback){try{const r=await fetch(path);if(!r.ok)return fallback;return await r.json()}catch{return fallback}}
try{
 const [images,details,version,skills]=await Promise.all([
  optionalJson('./image-audit.json',{results:[]}),optionalJson('./hero-details.json',{records:{}}),
  optionalJson('./version-status.json',null),optionalJson('./skill-reference.json',{records:{}})
 ]);
 imageAudit=images;heroDetails=details;skillReference=skills;
 if(version)$('#currentVersion').innerHTML='<p>核對日期：'+esc(version.checkedAt.slice(0,10))+'</p>'+version.sources.map(s=>'<p><b>'+esc(s.kind)+'：</b><a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+' ↗</a><br>'+esc(s.summary)+'</p>').join('');
 const r=await fetch('./catalogue.json');if(!r.ok)throw Error('讀取圖鑑失敗');installData(await r.json(),'公開資料快照');await refresh();
}catch(e){$('#syncState').textContent=e.message;toast('圖鑑載入失敗，請重新整理頁面');}
