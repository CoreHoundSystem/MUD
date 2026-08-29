qSpell = "";		//qued spell

function combat(x,y) {
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
		if(x.equipped.mainhand == "") {
			xMain = "unarmed";
			base = 189;	//return to 89 after testing
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
		/*
		xMainFreq = 0;
		xOffFreq = 0;
		yWeaponFreq = window[yWeapon].speed;
		xMainParry = 0;
		xOffParry = 0;
		yWeaponParry = window[yWeapon].parry;
		xMainSkill = window[xMain].skill;
		yWeaponSkill = ((x.level + y.level) * 5) + y.skill[window[yWeapon].skill].rating;
		xMainFreq = window[xMain].speed;
		xMainParry = window[xMain].parry;
		xMainAttr = window[xMain].attr;
		yWeaponAttr = window[yWeapon].attr;
		*/
		threat = ((x.level + y.level) * .05);
		if(threat == 0) {
			threat = .05;
		}
		combatInterval(y,x,"mainhand",threat,base);
		if(dualWield == 1) {
			combatInterval(y,x,"offhand",threat,base);
		}
		//launch attacks
		
		
	}
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




