qSpell = "";		//qued spell

function combat(x,y) {
	console.log(x);
	console.log(y);
	//enter 'combatMode'
	
	doBattle = setInterval(function() {
		if(character.hp.current <= 0 || window[y].hp.current <= 0) {
			//stop
		} else {
			if(qSpell == "") {
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
					console.log(Math.floor(Math.random() * miss.length)+1);
					attRan = att[Math.floor(Math.random() * att.length)+1];
					missRan = miss[Math.floor(Math.random() * miss.length)+1];
					post(character.name + attackRan + character.equiped.mainhand + missRan,3);
				} else {
					result = "hits!";
					
				}
				console.log(roll + " " + result);
			} else {
				post(character.name + " uses " + qSpell,2);	//class should originate from ability
				qSpell = "";
				console.log(character);
			}
		}
	}, 3000);
}
