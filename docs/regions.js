// Call applyAsiaEvidence on raw catalogue data before choosing a region.
// Eligibility includes legacy archive membership or reviewed official evidence;
// neither guarantees complete skill data, guide coverage, or simulation support.
export function asiaHeroes(heroes){return heroes.filter(x=>x.asiaListed===true)}
export function referenceHeroes(heroes){return heroes.filter(x=>x.asiaListed!==true)}
export function inRegion(heroes,region='asia'){return region==='reference'?referenceHeroes(heroes):region==='official'?asiaHeroes(heroes).filter(x=>x.asiaEvidence||x.asiaLegacyListed):asiaHeroes(heroes)}
