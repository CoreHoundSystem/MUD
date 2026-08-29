function combatInterval(x,y,z) {
	//x = character or mobID objects
	//y = main of offhand
	//i.e. combatInterval(characterID,"mainhand")
	window[x.name + y +"Interval"] = setInterval(function() {
		a = x.name + y;
		console.log(a);
		window[a + "weapon"] = x.equipped[y];				//identifies equipped weapon in specified hand
		console.log(window[a + "weapon"]);					//this should read Evandermainhand = "";
		if(window[a + "weapon"] == "") {
			window[a + "weapon"] = "unarmed";
		}
		console.log(window[a + "weapon"]);					//this should read Evandermainhand = "unarmed";
		console.log(window[window[a + "weapon"]]);			//this should read Evandermainhand = "unarmed" as object;
		bonus = ((x.attr[xMainAttr] - x.level) + (x.skill[xMainSkill].rating - (x.level * 5))) / z;
		
		
		/*
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
		d = window[xMain].damage.split("d");
		console.log(window[xMain].damage);
		dice = d[0];
		dType = d[1];
		dmg = dice * Math.floor(Math.random() * dType) + 1;
		f = 1;
		xp = 0;
		console.log(dmg + "damage.");
		aRan = att[Math.floor(Math.random() * att.length)];
		desc = "";
		dStyle = 5;
		if(roll < aRating) {
			console.log("Hit checks");
			//check dodge - dodge negates damage and effect
			attackResolved = 0;
			dodgeCheck = Math.floor(Math.random() * 100) + 1;
			console.log(dodgeCheck);
			if(dodgeCheck < 5 + y.level * threat && attackResolved == 0) {
				attackResolved = 1;
				z = dodge;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 7;
			} else {
				xp++;
			}
			//check parry - parry negates damage and effect and offers immediate attack of opportunity
			parryCheck = Math.floor(Math.random() * 100) + 1;
			console.log(parryCheck);
			if(parryCheck < (5 + yWeaponParry) && attackResolved == 0) {
				attackResolved = 1;
				z = parry;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 7;
			} else {
				xp++;
			}
			//check glancing blow - attacker deals minimum damage (no roll)
			glanceCheck = Math.floor(Math.random() * 100) + 1;
			console.log(glanceCheck);
			if(glanceCheck < y.level * threat && attackResolved == 0) {
				attackResolved = 1;
				z = glance;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 5;
				//get min damage
			} else {
				xp++;
			}
			//block check if shield is equipped
				//successful block reduces damage by a min amt or a percentage - whichever is higher
			blockCheck = Math.floor(Math.random() * 100) + 1;
			console.log(blockCheck);
			//setup to compute enemy block
			if(blockCheck < y.level * threat && attackResolved == 0) {
				attackResolved = 1;
				z = block;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 5;
				//roll damage and absorb portion
				console.log("Absorb part of " + dmg);
			} else {
				xp++;
			}
			//if the attack is not blocked, parried, or dodged then apply hit
				//crit attacks do 50% more damage
			
			
			
			
			
			if(crit == 1) {
				z = critical;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 6;
				console.log(Math.floor(dmg * 1.5));
				y.hp.current = y.hp.current - Math.floor(dmg * 1.5);
				xp = xp + (x.level * 1.5);
			} else {
				z = hit;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 5;
				console.log(dmg);
				y.hp.current = y.hp.current - dmg;
				xp = xp + x.level;
			}
		} else {
			console.log("Miss");
			if(crit == 1) {
				z = stum;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 8;
				f = 2;
			} else {
				z = miss;
				desc = z[Math.floor(Math.random() * z.length)];
				dStyle = 7;
			}
		}
		post(x.name + aRan + window[xMain].cName + " at " + y.name + desc,dStyle);
		//check for spell
		//check for hp
		if(x.hp.current <= 0) {
			clearInterval(xMainInterval);
			console.log(x.name + " dies!");
			//death function
		}
		if(y.hp.current <= 0) {
			clearInterval(xMainInterval);
			console.log(y.name + " dies!");
			//corpse funtion
		}
		//award xp
		console.log(x.name + " gains " + xp + " experience.");
		command("hp");
		xMainFreq = xMainFreq * f;
		*/
	}, 3000);
}
