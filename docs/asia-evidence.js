// Reviewed positive evidence, independent of the incomplete legacy hero.json.
// Never infer release eligibility from mainland ID order or the absence of a name.
const reviewed='2026-11-15';
const source=(url,title,note)=>({url,title,note,reviewed});
const dst=source('https://www.onmyojigame.com/zh/dst/','繁中官方：帝釋天與阿修羅登場活動','歷史登場公告；不代表技能及配搭已按現行版本驗證。');
const summer=source('https://www.onmyojigame.com/zh/summer/','繁中官方：盛夏召喚與式神名單','活動卡池及角色名單明列此式神。');
const bleach=source('https://www.onmyojigame.com/zh/news/official/2020/04/29/25278_878247.html','繁中官方：BLEACH 聯動登場公告','歷史限定聯動；收錄不表示目前可以取得。');
const current=source('https://www.onmyojigame.com/zh/index.html','繁中官方：石長姬、百羽鳳凰火登場','2026-11-15 核對首頁登場資訊；首頁內容日後可能更換。');
export const asiaEvidence={
597:{name:'葛葉',source:source('https://play.google.com/store/apps/details?id=com.netease.onmyoji.na&hl=zh_TW','官方 Google Play：葛葉登場資訊','官方商店描述提及葛葉；2026-11-06 更新日不代表技能平衡版本日。')},
364:{name:'阿修羅',source:dst},363:{name:'帝釋天',source:dst},
347:{name:'緣結神',source:source('https://www.onmyojigame.com/zh/fab/','繁中官方：緣結神登場','官方活動頁載有 2020 年登場資訊。')},
608:{name:'石長姬',source:current},607:{name:'百羽鳳凰火',source:current},
337:{name:'黑崎一護',source:bleach},336:{name:'朽木露琪亞',source:bleach},
333:{name:'大嶽丸',source:summer},351:{name:'鈴鹿御前',source:summer},353:{name:'緊那羅',source:summer},362:{name:'蟬冰雪女',source:summer},330:{name:'不知火',source:summer},331:{name:'御怨般若',source:summer}
};
export function applyAsiaEvidence(data){return{...data,heroes:data.heroes.map(x=>{const record=asiaEvidence[x.id],legacy=x.asiaLegacyListed===undefined?(x.asiaListed===true&&!x.asiaEvidence):x.asiaLegacyListed===true;return{...x,sourceName:x.sourceName||x.name,name:record?.name||x.name,asiaLegacyListed:legacy,asiaListed:legacy||!!record,asiaEvidence:record?.source||null}})}};
export function releaseLabel(x){return x.asiaEvidence?'亞洲官方來源已收錄':x.asiaLegacyListed?'亞洲官方舊名錄':x.asiaCommunityListed?'社群標記亞服（非官方核對）':'亞洲實裝待核對'}
