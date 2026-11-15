import{heroGuides}from'./hero-guides.js';
export const heroProfiles=heroGuides;
export function guidanceState(hero){if(!hero.asiaListed)return{kind:'unverified',label:'亞洲實裝待核對 · 附參考教學'};const p=heroProfiles[hero.id];if(p)return{kind:'profile',label:p.collectionOnly?'收藏／限制挑戰說明':'逐隻編寫的使用教學'};return{kind:'missing',label:'專屬教學待補'}}
