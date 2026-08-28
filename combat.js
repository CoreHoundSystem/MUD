qSpell = "";		//qued spell

function combat(x,y) {
	console.log(x);
	console.log(y);
	//enter 'combatMode'
	
	doBattle = setInterval(function() {
		if(character.hp.current <= 0 || y.hp.current <= 0) {
			//stop
		} else {
			if(qSpell == "") {
				cAtt = character.attr.str;
				cSkill = character.skill.unarmed.rating;
				cWeapon = "fist";
				cCrit = 5;
				doCrit = 0;
				if(character.equipped.mainhand !== "") {
					//build database of weapons and skills
					console.log(character.equipped.mainhand);
					cWeapon = character.equipped.mainhand;
					cCrit = "";
				}
				cLvl = character.level;
				threat = ((cLvl + y.level) * .05);
				console.log(threat);
				console.log(y.level);
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
				critCheck = Math.floor(Math.random()*100)+1;
				if(critCheck < cCrit) { 
					doCrit = 1;
				}
				console.log("Hit chance " + effectiveBonus);
				if (roll > effectiveBonus) {
					result = "misses.";
					console.log(Math.floor(Math.random() * miss.length));
					attRan = att[Math.floor(Math.random() * att.length)];
					if(doCrit == 0) {
						missRan = miss[Math.floor(Math.random() * miss.length)];
						post(character.name + attRan + cWeapon + missRan,7);
					} else {
						stumRan = stum[Math.floor(Math.random() * stum.length)];
						post(character.name + attRan + cWeapon + stumRan,8);
						qSpell = "his action to regain composure.";
					}
				} else {
					result = "hits!";
					console.log(Math.floor(Math.random() * hit.length));
					attRan = att[Math.floor(Math.random() * att.length)];
					if(doCrit == 0) {
						hitRan = hit[Math.floor(Math.random() * hit.length)];
						post(character.name + attRan + cWeapon + hitRan,7);
					} else {
						critRan = crit[Math.floor(Math.random() * crit.length)];
						post(character.name + attRan + cWeapon + critRan,8);
						qSpell = "his skill to attack twice!";
					}	
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
