export const stats={atk:'攻擊（固定值）',def:'防禦（固定值）',hp:'生命（固定值）',atkPct:'攻擊加成',defPct:'防禦加成',hpPct:'生命加成',speed:'速度',hit:'效果命中',res:'效果抵抗',crit:'暴擊',cd:'暴擊傷害'};
export const legalMains={1:['atk'],2:['atkPct','defPct','hpPct','speed'],3:['def'],4:['atkPct','defPct','hpPct','hit','res'],5:['hp'],6:['atkPct','defPct','hpPct','crit','cd']};
export const roleLabels={dps:'輸出',control:'控制',accelerator:'拉條／搶先手',orber:'供火',healer:'治療',shield:'護盾',support:'一般輔助／生存'};
export const defaultScale={dps:'atkPct',control:'none',accelerator:'none',orber:'none',healer:'hpPct',shield:'hpPct',support:'none'};
const setPlans={dps:{ids:[24,30,32,18],text:'先按技能段數、目標血量與鬼火挑四件套；沒有指定套時，可暫用其他相容的輸出四件套，再以最終面板重測。破勢、針女、狂骨與心眼的觸發條件不同，不能視為等效替換。'},control:{ids:[1,6,29],text:'先確認技能能觸發該控制御魂，以及目標沒有免疫。沒有指定套時，可研究其他相容的控制套；不同控制類型、觸發次數和機率不能互換。'},accelerator:{ids:[8,15],text:'招財貓與火靈分別偏向回合供火與開局供火。若任務是搶一速而四件套拖慢速度，可先用速度散件；代價是失去四件套供火，必須另補鬼火來源。'},orber:{ids:[15,8],text:'先確保供火式神在需要鬼火的隊友之前行動。火靈與招財貓並非同一種供火；如果都沒有，先依式神技能供火，並重新核對整隊開局耗火，不能假設散件會供火。'},healer:{ids:[20,26,8],text:'治療套、治療轉盾與供火套用途不同，先確認技能相容性。缺套時可暫用生存二件套或散件維持行動與存活，代價是失去額外治療、護盾或供火。'},shield:{ids:[28,17,2],text:'開局護盾、傷害分攤與受暴擊後護盾有不同時點，並非等效替代。缺套時先用生存二件套或散件提高技能所需屬性，但不能當作仍有原套的保護效果。'},support:{ids:[8,15,2],text:'依隊伍缺口決定供火或生存。沒有指定四件套時可用同類二件套或散件補速度與生存；把失去的供火、護盾或其他功能列回隊伍需求。'}};
export function buildGuide(role='dps',scale=defaultScale[role],needsCrit=role==='dps',six='auto'){
 if(!roleLabels[role])role='support';if(!['atkPct','hpPct','defPct','none'].includes(scale))scale=defaultScale[role];
 const coeff=scale==='none'?'hpPct':scale,fast=['control','accelerator','orber','healer','shield','support'].includes(role),priority=role==='control'?['speed','hit','hpPct','defPct','res']:role==='accelerator'?['speed','hpPct','defPct','res']:['orber','support'].includes(role)?['speed','hpPct','defPct','res']:needsCrit?['crit',coeff,'cd','speed','hpPct','defPct']:fast?['speed',coeff,'hpPct','defPct','res']:[coeff,'speed','hpPct','defPct','res'];
 if(needsCrit&&!priority.includes('crit'))priority.splice(role==='control'?2:1,0,'crit','cd');
 const subs=[...new Set(priority)].map(x=>stats[x]);
 const picks={1:'atk',2:fast?'speed':coeff,3:'def',4:role==='control'?'hit':coeff,5:'hp',6:needsCrit?'crit':coeff};
 if(six!=='auto'){if(!legalMains[6].includes(six))throw Error('六號位主屬性不合法');picks[6]=six}
 const slots=[1,2,3,4,5,6].map(n=>{const main=picks[n],fixed=[1,3,5].includes(n);let alternate=fixed?null:(n===2?(main==='speed'?coeff:'speed'):main==='hit'?'hpPct':main==='crit'?coeff:main==='hpPct'?'defPct':'hpPct');
 const fallback=fixed?'主屬性固定，換同位置的其他套裝或副屬性較合適的御魂；不能把主屬性改成速度／暴擊。':n===2&&main==='speed'?'先找其他套裝的速度主屬性；連這也沒有，才用生命／防禦加成加速度副屬性過渡。可能失去先手，需重排配速。':n===4&&main==='hit'?'先用其他套裝的效果命中主屬性；仍沒有，暫用生命加成搭命中副屬性，接受控制率下降，不能視為達標。':n===6&&needsCrit?'先找其他套裝的暴擊主屬性。沒有時暫用技能係數對應的加成，並從其餘位置及二件套補暴擊；不能因缺暴擊而直接改堆暴傷。':`先找其他套裝的${stats[main]}主屬性；仍沒有，才以${stats[alternate]}過渡。配速、輸出或治療／護盾量可能改變，換好後重看整套面板。`;
 return{slot:n,main,mainLabel:stats[main],alternate,allowed:legalMains[n].map(x=>stats[x]),subs,fallback,fixed}});
 return{role,label:roleLabels[role],scale,needsCrit,slots,subs,setPlan:setPlans[role],upgrade:six!=='auto'?'六號位已使用特殊技能需求；換成其他主屬性時，須重新檢查技能收益，不能當成等效替換。':needsCrit?'只有在最終暴擊已達此技能與目標所需門檻時，六號位才考慮暴擊傷害。換下暴擊主屬性後須重新計算暴擊率；一般可暴擊輸出常以 100% 為起點，但技能自帶暴擊、暴抗及特殊機制須另算。':'六號位先選技能係數對應屬性；若只負責功能且無屬性係數需求，先補生存。不要為了看起來高的暴傷犧牲速度或關鍵功能。'};
}
export const missingOptions={set:'沒有建議的四件套',speed:'沒有二號位速度',hit:'沒有四號位效果命中',crit:'沒有六號位暴擊',cd:'沒有六號位暴擊傷害',subs:'副屬性不理想',all:'整套都湊不齊'};
export function fallbackAdvice(guide,missing){switch(missing){case'speed':return{title:'先處理能否按順序行動',steps:['先在其他套裝找二號位速度主屬性，不必只找指定套。','可用較低星的速度主屬性暫代，但需看強化後的最終速度與生存。','全都沒有時，用其他位置的速度副屬性補，並調整隊伍速度或改刷較低難度。'],cost:'沒有達到先手／配速門檻，就不能保證原本的行動順序；二號位以外沒有速度主屬性。'};
case'hit':return{title:'換到命中主屬性，再看控制可靠度',steps:['先找任何相容套裝的四號位效果命中主屬性。','找不到時，使用命中副屬性及提供命中的二件套補足；四號位暫用生命加成提高存活。','把換裝後命中帶入「命中與抵抗」工具，查看實際機率是否可接受。'],cost:'此方案主要針對受效果命中影響的控制。固定機率或免疫目標不能靠堆命中解決，效果抵抗也不能代替效果命中。'};
case'crit':return{title:'先補暴擊，不用暴傷冒充替代',steps:['先在其他套裝找六號位暴擊主屬性。','找不到時，以'+stats[guide.scale==='none'?'hpPct':guide.scale]+'暫代，從其他位置的暴擊副屬性與暴擊二件套補。','若仍未達所需暴擊，接受傷害／治療不穩定並降低挑戰難度；不要承諾滿暴。'],cost:'僅適用於技能可暴擊且需要暴擊的配法。暴擊傷害不能提高暴擊發生機率；無法暴擊的技能不用照此堆暴擊。'};
case'cd':return{title:'沒有暴傷主屬性也能先用',steps:['可用暴擊主屬性，先滿足此技能所需暴擊率。','若其他位置已提供足夠暴擊，可研究技能係數對應的加成主屬性。','以換裝後完整面板比較，不以單顆御魂的暴傷判斷勝負。'],cost:'換主屬性會改變整套暴擊與係數收益；未驗證的技能不要只用通用傷害模型下結論。'};
case'subs':return{title:'先能上場，再逐顆替換',steps:['先確保每個位置的主屬性正確、關鍵配速與功能能達標。','優先挑本用途需要的副屬性：'+guide.subs.join('、')+'。不必每顆都同時具備全部。','資源有限時分段強化觀察結果；保留已達標的部件，逐顆換掉拖累整套面板的部件。'],cost:'強化副屬性有隨機性，不能保證補上缺少的速度或暴擊；也不要僅因一條不需要的副屬性就丟棄整顆。'};
case'all':return{title:'用現有裝備建立過渡套',steps:['依下方六個位置，先選能用的主屬性，補上隊伍必要的速度、供火與生存。','四件套湊不齊時，暫用 2＋2＋2 或散件補面板；二件套需同名兩件，散件不會自動有套裝效果。','先打能穩定完成的難度，再逐件換回目標四件套；若隊伍依賴特定供火或保護套，需同時改隊伍。'],cost:'2＋2＋2 或散件會失去目標四件套效果，不等於原配法，尤其不能當作仍有針女追傷、火靈開局火或招財供火。'};
default:return{title:'換套要知道失去了什麼',steps:[guide.setPlan.text,'若已有可用四件套，可先保留四件，把難找主屬性的部件放在另外兩格。四件套可由六個位置中的任意四格組成。','若指定四件套全部缺少，可先用相容的二件套組合或散件過渡，先補關鍵面板。'],cost:'不同四件套只是候選，不保證等效。先確認缺少的追傷、增傷、供火或護盾是否仍有人提供。'}}}
