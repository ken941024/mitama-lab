import{soulEffects,soulBonus}from'./soul-info.js';
import{heroProfiles}from'./hero-profiles.js';
import{asiaHeroes}from'./regions.js';
export function renderSoulDetail(catalogue,id,{esc:e,imageTag,minis,showDetail}){
 const s=catalogue.souls.find(s=>s.id===id);if(!s)return;
 const candidates=asiaHeroes(catalogue.heroes).filter(h=>heroProfiles[h.id]?.cases.some(c=>c.souls.includes(id)));
 showDetail(`<div class="detailhead">${imageTag(s)}<div><span class="eyebrow">御魂資料</span><h2>${e(s.name)}</h2><small>${e(s.en)}</small></div></div><div class="detailbody"><h3>套裝效果摘要</h3><p>${e(soulBonus(s))}</p><p>${e(soulEffects[id]||'效果待核對')}</p><p class="hint">摘要並非亞洲版現行效果逐條驗證，獨有、疊加與免疫以遊戲說明為準。</p><h3>哪些式神的教學選用了這套？</h3>${candidates.length?minis(candidates,'hero'):'<p>目前沒有獨立教學選用這套，先保留效果查閱，不按定位硬列推薦。</p>'}<p class="hint">點選式神看它的實際用途與操作條件；列入教學不表示所有場合都適用。</p><a href="https://guidemyoji.com/souls" target="_blank" rel="noopener">查閱御魂來源 ↗</a></div>`);
}
