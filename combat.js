function combat(x,y) {
	console.log(x);
	console.log(y);
	//enter 'combatMode'
	//x = target
	//build numbers
	//find att and skill
	cAtt = character.attr.str;
	cSkill = character.skill.unarmed.rating;
	if(character.equipped.mainhand !== "") {
		//build database of weapons and skills
		console.log(character.equipped.mainhand);
	}
	cLvl = character.level;
	threat = ((cLvl + window[y].level) * .05);
	console.log(threat);
	console.log(window[y].level);
	if(threat == 0) {
		threat = .05;
	}
	console.log(threat);
	bonus = ((cAtt - cLvl) + (cSkill - (cLvl * 5))) / threat;
	console.log(bonus);
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
	
}
