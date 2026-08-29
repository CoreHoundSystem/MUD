function combatInterval(w,x,y,z,b) {
	//x = character or mobID objects
	//y = main of offhand
	//i.e. combatInterval(characterID,"mainhand")
	a = x.name + y +"Interval";
	freq = 0;
	f = 1;
	window[a] = setInterval(function() {
		window[a + "weapon"] = x.equipped[y];				//identifies equipped weapon in specified hand
		console.log(window[a + "weapon"]);					//this should read Evandermainhand = "";
		if(window[a + "weapon"] == "") {
			window[a + "weapon"] = "unarmed";
		}
		console.log(window[a + "weapon"]);					//this should read Evandermainhand = "unarmed";
		console.log(window[window[a + "weapon"]]);			//this should read Evandermainhand = "unarmed" as object;
		attr = window[window[a + "weapon"]].attr;			//fetch weapon attribute
		console.log(attr);
		cAttr = x.attr[attr];
		console.log(cAttr);
		skill = window[window[a + "weapon"]].skill;			//fetch weapon skill
		freq = window[window[a + "weapon"]].speed;
		rating = x.skill[skill].rating;						//ID's rating with weapon skill
		bonus = ((cAttr - x.level) + (rating - (x.level * 5))) / z;
		console.log(bonus);
		aRating = bonus + b;
		if(aRating >= 95) {
			aRating = 95;
		}
		//do rolls
		roll = Math.floor(Math.random() * 100) + 1;
		cRoll = Math.floor(Math.random() * 100) + 1;
		crit = 0;
		if(cRoll <= 5) {
			crit = 1;
		}
		d = window[window[a + "weapon"]].damage.split("d");
		dice = d[0];
		dType = d[1];
		dRoll = dice * Math.floor(Math.random() * dType) + 1;
		//set counters and descriptors
		xp = 0;
		aRan = att[Math.floor(Math.random() * att.length)];
		desc = "";
		dStyle = 5;
		e = "";
		if(roll <= aRating) {
			console.log("Hit checks");
			attackResolved = 0;
			dodgeCheck = Math.floor(Math.random() * 100) + 1;
			console.log(dodgeCheck);
			if(dodgeCheck < 5 + w.level * threat && attackResolved == 0) {
				attackResolved = 1;
				e = dodge;
				dStyle = 7;
			} else {
				xp++;
			}
			parryCheck = Math.floor(Math.random() * 100) + 1;
			console.log(parryCheck);
			if(parryCheck < (5 + window[w.equipped.mainhand].parry) && attackResolved == 0) {
				attackResolved = 1;
				e = parry;
				dStyle = 7;
			} else {
				xp++;
			}
			glanceCheck = Math.floor(Math.random() * 100) + 1;
			console.log(glanceCheck);
			if(glanceCheck < w.level * threat && attackResolved == 0) {
				attackResolved = 1;
				e = glance;
				dStyle = 5;
				//get min damage
			} else {
				xp++;
			}
			//needs more depth
			blockCheck = Math.floor(Math.random() * 100) + 1;
			console.log(blockCheck);
			if(blockCheck < w.level * threat && attackResolved == 0) {
				attackResolved = 1;
				e = block;
				dStyle = 5;
				//roll damage and absorb portion
				console.log("Absorb part of " + dRoll);
			} else {
				xp++;
			}
			if(crit == 1) {
				e = critical;
				dStyle = 6;
				console.log(Math.floor(dRoll * 1.5));
				w.hp.current = w.hp.current - Math.floor(dRoll * 1.5);
				xp = xp + (x.level * 1.5);
			} else {
				e = hit;
				dStyle = 5;
				console.log(dRoll);
				w.hp.current = w.hp.current - dRoll;
				xp = xp + x.level;
			}
		} else {
			console.log("Miss");
			if(crit == 1) {
				e = stum;
				dStyle = 8;
				f = 2;
			} else {
				e = miss;
				dStyle = 7;
			}
		}
		desc = e[Math.floor(Math.random() * e.length)];
		post(x.name + aRan + window[xMain].cName + " at " + y.name + desc,dStyle);
		if(y.hp.current <= 0) {
			clearInterval(xMainInterval);
			console.log(y.name + " dies!");
			//corpse funtion
		}
		//award xp
		console.log(x.name + " gains " + xp + " experience.");
		command("hp");
		
		/*
			
		
		
		//check for spell
		//check for hp
		if(x.hp.current <= 0) {
			clearInterval(xMainInterval);
			console.log(x.name + " dies!");
			//death function
		}
		
		
		*/
	}, freq * f);
}
