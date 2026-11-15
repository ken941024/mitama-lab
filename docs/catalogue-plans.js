import{heroProfiles}from'./hero-profiles.js';
export const asiaReviewHolds={609:'亞洲版實裝與技能尚待覆核，保留參考教學。',611:'亞洲版實裝與技能尚待覆核，保留參考教學。',612:'亞洲版實裝與技能尚待覆核，保留參考教學。'};
export function profileFor(h){return heroProfiles[h.id]||null}
export function attachDetails(data,details){return{...data,heroes:data.heroes.map(h=>{const r=details.records?.[h.id]||Object.values(details.records||{}).find(r=>r.sourceName===h.sourceName||r.sourceName===h.name);if(!r)return h;const hold=!h.asiaEvidence&&asiaReviewHolds[h.id],community=r.serverTw===true&&!hold;return{...h,details:r,asiaCommunityListed:community,asiaReviewNote:hold||null,asiaListed:h.asiaListed||community,tags:h.tags.length?h.tags:r.tags||[]}})}}
