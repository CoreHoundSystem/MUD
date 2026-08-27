
function combat(x,y) {
	//enter 'combatMode'
	//x = player, y = target
	//build numbers
	//find att and skill
	cAtt = x.attr.str;
	cSkill = x.skill.unarmed.rating;
	if(x.mainhand !== "") {
		//build database of weapons and skills
	}
	cLvl = x.level;
	threat = ((cLvl + y.level) * .05);
	if(threat == 0) {
		threat = .05;
	}
	bonus = ((cAtt - cLvl) + (cSkill - (cLvl * 5))) / threat;
	
	result = "";
	roll = Math.floor(Math.random()*100)+1;
	max = 95;	//dual wield and two hander
	effectiveBonus = 0;
	if((bonus + 95) > max) { 
		effectiveBonus = max; 
	} else {
		effectiveBonus = bonus + 95; 
	}
	console.log("Hit chance " + effectiveBonus);
	if (roll > effectiveBonus) {
		result = "misses.";
	} else {
		result = "hits!";
	}
	console.log(roll + " " + result);
	//start interval
	


	
	
	
	
	/*
	bonus = ((character.attr.dex - cLvl) 
		+ (character.skill.sword.rating - (cLvl * 5)))
		/ threat;
	//
	console.log(character.attr.dex);
	console.log(character.level);
	console.log(character.skill.sword);
	console.log(bilgeRat.level);
	console.log(character.attr.dex - character.level);
	//console.log((character.attr.dex - character.level) / character.level);
	//console.log(((character.attr.dex - character.level) / character.level) * 10);
	console.log(character.skill.sword.rating - (character.level * 5));
	console.log((character.level + bilgeRat.level) * 5);
	console.log(x.name + " attacks " + y + ".");
	console.log("Hit chance " + (95 + bonus));
	*/

	//+ Math.floor(Math.random()*100)+1 < y) {
		
		
}
