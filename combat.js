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
			base = 189;	//return to 89 after testing
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
		yWeaponFreq = window[yWeapon].speed;
		xMainParry = 0;
		xOffParry = 0;
		yWeaponParry = window[yWeapon].parry;
		xMainSkill = window[xMain].skill;
		yWeaponSkill = ((x.level + y.level) * 5) + y.skill[window[yWeapon].skill].rating;
		console.log(window[yWeapon]);
		console.log(window[yWeapon].skill);
		console.log(y.skill[window[yWeapon].skill].rating);
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
			dmg = 0;
			d = window[xMain].damage.split("d");
			console.log(window[xMain].damage);
			dice = d[0];
			dType = d[1];
			dmg = dice * Math.floor(Math.random() * dType) + 1;
			console.log(dmg);
			aRan = att[Math.floor(Math.random() * att.length)];
			if(roll < aRating) {
				console.log("Hit");
				//check dodge - dodge negates damage and effect
				attackResolved = 0;
				dodgeCheck = Math.floor(Math.random() * 100) + 1;
				console.log(dodgeCheck);
				if(dodgeCheck < 5 + y.level * threat && attackResolved == 0) {
					attackResolved = 1;
					z = dodge;
					dodgeRan = z[Math.floor(Math.random() * z.length)];
					post(character.name + aRan + xMain + dodgeRan + y.name + ".",7);
				}
				//check parry - parry negates damage and effect and offers immediate attack of opportunity
				parryCheck = Math.floor(Math.random() * 100) + 1;
				console.log(parryCheck);
				if(parryCheck < (5 + yWeaponParry) && attackResolved == 0) {
					attackResolved = 1;
					z = parry;
					parryRan = z[Math.floor(Math.random() * z.length)];
					post(character.name + aRan + xMain + parryRan + y.name + ".",7);
				}
				//check glancing blow - attacker deals minimum damage (no roll)
				glanceCheck = Math.floor(Math.random() * 100) + 1;
				console.log(glanceCheck);
				if(glanceCheck < y.level * threat && attackResolved == 0) {
					attackResolved = 1;
					z = glance;
					glanceRan = z[Math.floor(Math.random() * z.length)];
					post(character.name + aRan + xMain + glanceRan + y.name + ".",5);
					//get min damage
				}
				//block check if shield is equipped
					//successful block reduces damage by a min amt or a percentage - whichever is higher
				blockCheck = Math.floor(Math.random() * 100) + 1;
				console.log(blockCheck);
				//setup to compute enemy block
				if(blockCheck < y.level * threat && attackResolved == 0) {
					attackResolved = 1;
					z = block;
					blockRan = z[Math.floor(Math.random() * z.length)];
					post(character.name + aRan + xMain + blockRan + y.name + ".",5);
					//roll damage and absorb portion
				}
				//if the attack is not blocked, parried, or dodged then apply hit
					//crit attacks do 50% more damage
				
				
				
				
				
				if(crit == 1) {
					critRan = critical[Math.floor(Math.random() * critical.length)];
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
			//check for spell
			//check for fumble
			//check for hp
			//award xp
		}, xMainFreq * 1000);
		if(dualWield == 1) {
			xOffInterval = setInterval(function() {
				//((cAtt - cLvl) + (cSkill - (cLvl * 5))) / threat;
				//((cLvl + window[y].level) * .05)
				console.log(x.attr[xOffAttr]);
				bonus = ((x.attr[xOffAttr] - x.level) + (x.skill[xOffSkill].rating - (x.level * 5))) / threat;
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
						critRan = critical[Math.floor(Math.random() * critical.length)];
						post(character.name + aRan + xOff + critRan,6);
					} else {
						hitRan = hit[Math.floor(Math.random() * hit.length)];
						post(character.name + aRan + xOff + hitRan,5);
					}
				} else {
					console.log("Miss");
					if(crit == 1) {
						stumRan = stum[Math.floor(Math.random() * stum.length)];
						post(character.name + aRan + xOff + stumRan,8);
					} else {
						missRan = miss[Math.floor(Math.random() * miss.length)];
						post(character.name + aRan + xOff + missRan,7);
					}
				}
			}, (xOffFreq * 1000) + 1000);
		}
		yWeaponInterval = setInterval(function() {
			//((cAtt - cLvl) + (cSkill - (cLvl * 5))) / threat;
			//((cLvl + window[y].level) * .05)
			console.log(yWeapon);
			bonus = (x.level) + (yWeaponSkill - (x.level * 5)) * threat;
			console.log(x.level);
			console.log(yWeaponSkill);
			console.log(threat);
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
					critRan = critical[Math.floor(Math.random() * critical.length)];
					post(y.name + aRan + yWeapon + critRan,6);
				} else {
					hitRan = hit[Math.floor(Math.random() * hit.length)];
					post(y.name + aRan + yWeapon + hitRan,5);
				}
			} else {
				console.log("Miss");
				if(crit == 1) {
					stumRan = stum[Math.floor(Math.random() * stum.length)];
					post(y.name + aRan + yWeapon + stumRan,8);
				} else {
					missRan = miss[Math.floor(Math.random() * miss.length)];
					post(y.name + aRan + yWeapon + missRan,7);
				}
			}
		}, yWeaponFreq * 1000);
	}
	
	/* Formulas
	Using attr, skill, and level difference
		((x.attr[xMainAttr] - x.level) + (x.skill[xMainSkill].rating - (x.level * 5))) / ((x.level + y.level) * .05);
		((1 - 1) + (1 - 5)) / ((1 + -1) * .05) = (0 + -4) / (0 * 0.05) [Min 0.05] = -4/.05 -80
		((1 - 1) + (10 - 5)) / ((1 + -1) * .05) = (0 + 5) / (0 * 0.05) [Min 0.05] = 5/.05 25
		((1 - 2) + (10 - 10)) / ((2 + -1) * .05) = (-1 + 0) / (1 * 0.05) [Min 0.05] = -1/.05 -5
		((2 - 2) + (15 - 10)) / ((2 + -1) * .05) = (0 + 5) / (1 * 0.05) [Min 0.05] = 5/.05 25
		((3 - 3) + (15 - 15)) / ((3 + -1) * .05) = (0 + 0) / (2 * 0.05) [Min 0.05] = 0/.1 0
		((4 - 4) + (25 - 20)) / ((4 + -1) * .05) = (0 + 5) / (3 * 0.05) [Min 0.05] = 5/.15 33.
	
	
	
	
	
	
	
	
	
	
	*/
	
		//combat is interrupted for:
			//player 'casts' a special ability
				//zero round 'telegraphs' ability - uses normal weapon speed modified by ability
				//combat resumes after ability is resolved
			//combatant is subject to an effect
				//stun - stunned combatant spends x number of attacks 'stunned' - dangerous against foes with slow attack speeds
				//slowed/hastened - this effect applies a multiplier to setInterval
				//eating/drinking - player eating or drinking can not attack nor can they parry or block
			
					
					
	
	
	
	
}
