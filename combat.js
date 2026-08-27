
function combat(x,y) {
	//enter 'combatMode'
	//x = player, y = target
	//build numbers
	//start interval
	threat = ((character.level + bilgeRat.level) * .05);
	if(threat == 0) {
		threat = .05;
	}
	bonus = ((character.attr.dex - character.level) 
		+ (character.skill.sword.rating - (character.level * 5)))
		/ threat;
	//
	console.log(character.attr.dex);
	console.log(character.level);
	console.log(character.skill.sword);
	console.log(bilgeRat.level);
	console.log(character.attr.dex - character.level);
	//console.log((character.attr.dex - character.level) / character.level);
	//console.log(((character.attr.dex - character.level) / character.level) * 10);
	console.log(character.skill.sword - (character.level * 5));
	console.log((character.level + bilgeRat.level) * 5);
	console.log(x.name + " attacks " + y + ".");
	console.log("Hit chance " + (95 + bonus));
	result = "";
	roll = Math.floor(Math.random()*100)+1;
	baseBonus = bonus + 95;
	max = 95;
	effectiveBonus = 0;
	if(baseBonus > max) { 
		effectiveBonus = max; 
	} else {
		effectiveBonus = baseBonus; 
	}
	console.log("Hit chance " + effectiveBonus);
	if (roll > effectiveBonus) {
		result = "misses.";
	} else {
		result = "hits!";
	}
	console.log(roll + " " + result);

	//+ Math.floor(Math.random()*100)+1 < y) {
		
		
}
