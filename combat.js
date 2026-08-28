qSpell = "";		//qued spell

function combat(x,y) {
	console.log(x);
	console.log(y);
	//confirm participants - perfomed in command function
	//confirm both have at least 1 hp
	base = 95;
	block = 0;
	dodge = 0;//dodge chance?
	if(character.hp.current <= 0 || y.hp.current <= 0) {
		//stop combat
		console.log(x.name + " has " + x.hp.current + "health.");
		console.log(y.name + " has " + y.hp.current + "health.");
	} else {
		//both combatants have at least 1 hp
		xMain = x.equipped.mainhand;
		xOff = x.equipped.offhand;
		yWeapon = y.weapon;
		dualWield = 0;
		console.log(window[yWeapon].used);
		if(x.equipped.mainhand == "") {
			xMain = "unarmed";
			base = 89;
			console.log(window[xMain].used);
		} else {
			if((window[xMain].used == "mainhand" || window[xMain].used == "onehand") && (window[xOff].used == "offhand" || window[xOff].used == "mainhand")) {
				//player is dualwielding
				dualWield = 1;
				base = 76;
				console.log(window[xMain].used);
				console.log(window[xOff].used);
			}
			if((window[xMain].used == "mainhand" || window[xMain].used == "onehand") && window[xOff].used == "shield") {
				//player is using a shield
				base = 85;
				block = window[xOff].block;	//may move is shield needs to be boolean
				console.log(window[xMain].used);
				console.log(window[xOff].used);
			}
			if(window[xMain].used == "twohand") {
				//player is using both hands
				base = 89;
				console.log(window[xMain].used);
			}
		}
		xMainFreq = 0;
		xOffFreq = 0;
		//yWeaponFreq = 0;
		xMainParry = 0;
		xOffParry = 0;
		//yWeaponParry = 0;
		xMainSkill = window[xMain].skill;
		//yWeaponSkill = "";
		xMainFreq = window[xMain].speed;
		xMainParry = window[xMain].parry;
		xMainAttr = window[xMain].attr;
		yWeaponAttr = window[yWeapon].attr;
		threat = ((x.level + y.level) * .05);
		if(threat == 0) {
			threat = .05;
		}
		if(dualWield == 1) {
			xOffSkill = window[xOff].skill;
			xOffFreq = window[xOff].speed;
			xMainParry = window[xMain].parry + window[xOff].parry;
			xOffAttr = window[xOff].attr;
		}
		//launch attacks
		xMainInterval = setInterval(function() {
			//((cAtt - cLvl) + (cSkill - (cLvl * 5))) / threat;
			//((cLvl + window[y].level) * .05)
			console.log(x.attr[xMainAttr]);
			bonus = ((x.attr[xMainAttr] - x.level) + (x.skill[xMainSkill].rating - (x.level * 5))) / threat;
			console.log(bonus);
			aRating = bonus + base;
			aMax = 95;
			if(aRating >= aMax) {
				aRating = aMax;
			}
			roll = Math.floor(Math.random() * 100) + 1;
			cRoll = Math.floor(Math.random() * 100) + 1;
			crit = 0;
			if(cRoll <= 5) {
				crit = 1;
			}
			aRan = att[Math.floor(Math.random() * att.length)];
			if(roll < aRating) {
				console.log("Hit");
				if(crit == 1) {
					critRan = crit[Math.floor(Math.random() * crit.length)];
					post(character.name + aRan + xMain + critRan,6);
				} else {
					hitRan = hit[Math.floor(Math.random() * hit.length)];
					post(character.name + aRan + xMain + hitRan,5);
				}
			} else {
				console.log("Miss");
				if(crit == 1) {
					stumRan = stum[Math.floor(Math.random() * stum.length)];
					post(character.name + aRan + xMain + stumRan,8);
				} else {
					missRan = miss[Math.floor(Math.random() * miss.length)];
					post(character.name + aRan + xMain + missRan,7);
				}
			}
		}, xMainFreq * 1000);
		
		
	}
	//get character data once
		//start with weapon - it defines a lot
			//mainhand - if 
				//one handed - check offhand
					//empty/non weapon - base attack = 95
					//another weapon - base attack = 76
					//shield - base attack = 85
				//two handed - base attack = 89
			//all weapons have a frequency/speed - this can result in multiple setIntervals for attacks in the case of dual wielding
			//weapons can require different stats and skills to use
			//all weapons have a parry chance
			
			
	//get mob data once
	
	//build attack stats for each participant
	
	//combat flow
		//start timers
			//if dual weilding the combatant has two timers
		//attack roll and crit check at same time
			//if miss then move on
				//if crit then que up 'recovery spell' to use combatant's next action
			//if hit is rolled then check the following
				//check dodge - dodge negates damage and effect
				//check parry - parry negates damage and effect and offers immediate attack of opportunity
				//check glancing blow - attacker deals minimum damage (no roll)
				//block check if shield is equipped
					//successful block reduces damage by a min amt or a percentage - whichever is higher
				//if the attack is not blocked, parried, or dodged then apply hit
					//crit attacks do 50% more damage
		//combat is interrupted for:
			//player 'casts' a special ability
				//zero round 'telegraphs' ability - uses normal weapon speed modified by ability
				//combat resumes after ability is resolved
			//combatant is subject to an effect
				//stun - stunned combatant spends x number of attacks 'stunned' - dangerous against foes with slow attack speeds
				//slowed/hastened - this effect applies a multiplier to setInterval
				//eating/drinking - player eating or drinking can not attack nor can they parry or block
			
					
					
	
	
	
	
	//enter 'combatMode'
	/*
	doBattle = setInterval(function() {
		if(character.hp.current <= 0 || window[y].hp.current <= 0) {
			//stop
		} else {
			if(qSpell == "") {
				cAtt = character.attr.str;
				cSkill = character.skill.unarmed.rating;
				cWeapon = "fist";
				cCrit = 5;
				doCrit = 0;
				base = 95
				if(character.equipped.mainhand !== "") {
					//build database of weapons and skills
					console.log(character.equipped.mainhand);
					cWeapon = character.equipped.mainhand;
					cCrit = 5;
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
				if((bonus + base) > max) { 
					effectiveBonus = max; 
				} else {
					effectiveBonus = bonus + base; 
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
					console.log(Math.floor(Math.random() * miss.length));
					attRan = att[Math.floor(Math.random() * att.length)];
					if(doCrit == 0) {
						hitRan = miss[Math.floor(Math.random() * hit.length)];
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
		
	}, 3000);*/
}
