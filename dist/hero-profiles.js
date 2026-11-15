// These are editorial candidates with explicit limits, not simulation results.
export const heroProfiles={
364:{role:'dps',title:'阿修羅 · 爆發與收尾配魂',sources:[{title:'配魂思路參考（非亞洲版實測）',url:'https://www.qieyou.com/content/95024'}],cases:[
{title:'高血線清場／探索',souls:[24],two:[36],text:'可先研究破勢四件套；適合先打高血線目標。二件套可考慮相容的首領御魂，沒有時先以暴擊或攻擊二件套補面板。這不保證達到某副本的一波傷害門檻。'},
{title:'供火穩定的副本爆發',souls:[32],two:[36,49],text:'可研究狂骨四件套。出手時鬼火不足會降低收益，必須先排好供火與行動順序。荒骷髏／鬼靈歌伎是不同機制的候選，需要核對該副本及技能能否觸發。'},
{title:'低血線補刀',souls:[18],two:[],text:'若隊友已壓低敵方血量，可研究心眼四件套。若阿修羅是第一個出手、目標仍在高血線，不能把心眼視作破勢的等效替換。'}],
partners:[{id:237,text:'山兔：拉條與配速候選，先確認阿修羅能接上行動。'},{id:205,text:'座敷童子：開局供火候選，供火必須早於耗火輸出。'},{id:363,text:'帝釋天：另一個支援方向；技能互動、行動順序及理性／狀態規則需按亞洲版現行技能核對。'}],
main:'1 號固定攻擊、2 號攻擊加成（需要配速時改速度）、3 號固定防禦、4 號攻擊加成、5 號固定生命、6 號先用暴擊；換暴傷前重算整套所需暴擊。',
fallback:'沒有首領二件套，先用暴擊或攻擊二件套補面板；沒有目標四件套，可先用其他相容的輸出四件套，或以 2＋2＋2／散件過渡。必須接受失去原四件套及首領效果的代價。',
limit:'以上是可研究的情境配搭，沒有驗證亞洲版現行阿修羅的完整技能、狀態與隊友互動。本站單目標模型也不等於阿修羅實戰，沒有自動填入他的技能倍率或理性效果。'},
237:{role:'accelerator',title:'山兔 · 先手與供火取捨',sources:[],cases:[{title:'需要搶先手',souls:[8,15],two:[],text:'先滿足整隊配速，再比較續航供火或開局供火。若套裝拖慢關鍵先手，可先用速度散件，並為失去的套裝供火另作安排。'}],partners:[{id:205,text:'座敷童子：檢查拉條後輸出前是否已供火。'},{id:364,text:'阿修羅：輸出示例，需檢查拉條後是否被敵人插隊。'}],fallback:'沒有二號位速度時，先找其他套裝的速度主屬性；仍沒有才用速度副屬性過渡，並重新調整挑戰難度。',limit:'此為通用先手指引，不是已驗證的整隊鬼火與完整行動條方案。'},
205:{role:'orber',title:'座敷童子 · 開局供火',sources:[],cases:[{title:'先讓隊友有火可用',souls:[15,8],two:[],text:'先排在需要鬼火的隊友之前。火靈偏向開局火，招財貓是機率供火，不能當作每次行動必定得到鬼火。'}],partners:[{id:237,text:'山兔：核對拉條與供火的先後。'},{id:364,text:'阿修羅：確保輸出前有足夠鬼火。'}],fallback:'沒有指定供火御魂時，先依式神自身技能供火，降低其他隊員的開局耗火；生存散件不會產生原套裝的鬼火。',limit:'沒有模擬座敷技能耗血、後續鬼火條及整隊逐回合收支。'}
};
export function guidanceState(hero,roles){if(!hero.asiaListed)return{kind:'unverified',label:'亞洲實裝待核對'};if(heroProfiles[hero.id])return{kind:'profile',label:'已整理情境配搭'};if(hero.details)return{kind:'reference',label:'技能資料＋配魂起點'};if(hero.tags.some(t=>roles.includes(t)))return{kind:'generic',label:'有通用定位建議'};return{kind:'missing',label:'專屬配搭資料待補'}}
