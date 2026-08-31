//delete these
$(function() {
	post("Loading game version 0.1.0.",2);
	post("Game Loaded.",2);
	if(document.cookie == "null") {
		console.log(document.cookie);
		//prompt to select character
		
	} else {
		console.log(document.cookie);
		character = JSON.parse(document.cookie);
	}
	loadGrid(window[character.grid]);
	startBreathing(character);
})

// modify these
function save() {
	document.cookie = JSON.stringify(character);
	//console.log(document.cookie);
}

function load() {
	console.log(JSON.parse(document.cookie));
}


healAMT = 15;

// modify above

//classes for postText
classes = [
	//player and system (0-10)
	"normal",				//default
	"playerCommand",		//player commands
	"serverCommand",		//server responses to player commands
	"adminCommands",		//admin commands and server updates
	"list",					//indents items in a list for readability
	"playerSucceeds",
	"pSucceedsCrit",
	"playerFails",
	"pFailsCrit",
	"notSet",
	"notSet",
	//spell schools (11-30)
	"abjuration",			//mystical warding
	"alteration",			//change a materials shape
	"auspex",				//enhance or displace senses 
	"charm",				//charm a living being
	"conjuration",			//create substance or channel it from another plane
	"divination",			//divine information about an object or place
	"enchantment",			//imbue an object or place with magical properties
	"evocation",			//calling an entity to your location
	"illusion",				//create a sensory experience (a literal experience)
	"invocation",			//calling an entity into yourself
	"necromancy",			//the manipulation of both positive and negative energies such as entropy and wyld
	"phantasm",				//impact an entity's senses by enforcing your will on their psyche (a subjective experience)
	"summoning",			//bring an entity from another location or plane
	"transmutation",		//change a materials makeup
	"notSet",
	"notSet",
	"notSet",
	"notSet",
	"notSet",
	"notSet",
	//quality (31-45)
	"common",				//
	"uncommon",				//
	"masterwork",			//
	"magic",				//
	"superior",				//
	"epic",					//
	"set",					//
	"artifact",				//
	"cursed",				//
	"notSet",
	"notSet",
	"notSet",
	"notSet",
	"notSet",
	"notSet",
]

paths = [
	"up",
	"u",
	"down",
	"d",
	"north",
	"n",
	"northeast",
	"ne",
	"east",
	"e",
	"southeast",
	"se",
	"south",
	"s",
	"southwest",
	"sw",
	"west",
	"w",
	"northwest",
	"nw",
	"stern",
	"bow",
	"portal",
	"p",
	"rift",
	"r",
]

senses = [
	"look",
	"smell",
	"taste",
	"listen",
	"feel",
]

commands = [];
commandIndex = commands.length;

$("#commandLine").keypress(function (e) {
	if(e.which === 13 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		console.log($("#commandLine").val());
		command($("#commandLine").val());
		//store commands
		commands.push($("#commandLine").val());
		commandIndex = commands.length;
		//clears command line
		$("#commandLine").val('');
	}
});

$("#commandLine").keydown(function (e) {
	if(e.which === 38 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		//console.log($("#commandLine").val());
		commandIndex = commandIndex-1;
		$("#commandLine").val(commands[commandIndex]);
		
	}
	if(e.which === 40 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		//console.log($("#commandLine").val());
		commandIndex = commandIndex + 1;
		$("#commandLine").val(commands[commandIndex]);
	}
	//console.log(commandIndex);
	//console.log(commands);
});

function post(a,b) {
	console.log(b);
	$('#txtScreen').append('<span class="' + classes[b] + '">' + a + '</span></br>');
	console.log(b);
	//this line moves scrollbar to bottom
	$("#txtScreen").change($('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight));
}

function command(c) {
	console.log(c);
	post(c,1);
	console.log(c);
	console.log(c.substring(0,c.indexOf(" ")));
	if(c.substring(0,c.indexOf(" ")).toLowerCase() == "say" || c.substring(0,c.indexOf(" ")).toLowerCase() == "inv" || c.substring(0,c.indexOf(" ")).toLowerCase() == "inventory" || c.substring(0,c.indexOf(" ")).toLowerCase() == "i" || c.substring(0,c.indexOf(" ")).toLowerCase() == "drop" || c.substring(0,c.indexOf(" ")).toLowerCase() == "get" || c.substring(0,c.indexOf(" ")).toLowerCase() == "attack") {
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "say") {
			says = c.substring(c.indexOf(" "),c.length);
			console.log(says);
			post(character.name + " says: " + says,0);
		}
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "drop") {
			drops = c.substring(c.indexOf(" ")+1,c.length);
			console.log(drops);
			inv = character.inventory;
			dropI = inv.indexOf(drops);
			if(dropI >= 0) {
				inv.splice(dropI, 1);
				character.inventory = inv;
				gets = grid.get;
				gets.push(drops);
				grid.get = gets;
				console.log(grid);
				loadGrid(grid);
			}
		}
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "get") {
			gets = c.substring(c.indexOf(" ")+1,c.length);				//identifies get request string
			console.log(gets);
			getI = grid.get.indexOf(gets);								//sets index of get request
			if(getI >= 0) {												//gets index of gets from 'get' array
				//character.inventory.push(gets);
				inv = character.inventory;
				inv.push(gets);
				character.inventory = inv;
				post(character.name + " picks up " + gets,0);			
				grid.get.splice(getI, 1);								//updates active grid get line
				//window[grid.id] = grid;									//
				console.log(grid);
				loadGrid(grid);
			} else {
				post("There is no " + gets + " present.",2);
			}
		}
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "attack") {
			target = c.substring(c.indexOf(" ")+1,c.length);
			console.log(target);
			//confirm target
			if(grid.mobs.indexOf(target) >= 0) {
				tI = grid.mobs.indexOf(target); 	//may not be mob
				//confirm target
				console.log(grid.mobIDs[tI]);
				m = grid.mobIDs[tI];
				console.log(window[m]);
				post(character.name + " attacks " + target,0);
				combat(character,window[m]);
			} else {
				post("There is no "+ target + " here.",0);
			}
		}
	} else {
		c = c.split(" ");
		if(c.length == 1) {
			console.log(c);
			if(c[0] == "i" || c[0] == "inv" || c[0] == "inventory") {
				console.log(c);
				post("********** Inventory **********",2);
				i = 0;
				for(i=0;i<character.inventory.length;i++) {
					post(character.inventory[i],4);
				}
				post("********** " + i + " item(s) **********",2);
			}
			if(c[0].toLowerCase() == "heal") {
				console.log(character.name);
				//conjuration
				post(character.name + " heals themself!",15);
				heal(character);	//adjust for target
				console.log(c);
			}
			if(c[0].toLowerCase() == "reset") {
				console.log(character.name);
				
				post("Reseting " + character.name + ".",2);
				character = null;
				console.log(c);
				//reset game
			}
			//check if path
			console.log(paths.indexOf(c[0].toLowerCase()));
			if(paths.indexOf(c[0].toLowerCase()) >= 0) {
				path = c[0].substring(0,1).toUpperCase() + c[0].substring(1);
				console.log(path);
				if(grid.paths.indexOf(path) > -1) {
					character.grid = grid.pathIDs[grid.paths.indexOf(path)];
					console.log(grid.pathIDs[grid.paths.indexOf(path)]);
					loadGrid(window[grid.pathIDs[grid.paths.indexOf(path)]]);
				}
			}
			//check if senses
			console.log(senses.indexOf(c[0].toLowerCase()));
			if(senses.indexOf(c[0].toLowerCase()) >= 0) {
				//sense = c[0].substring(0,1).toUpperCase() + c[0].substring(1);
				//console.log(sense);
				post(grid[c[0]].none,2);
				if(grid[c[0] + "Effect"].none != "None") {
					console.log(grid[c[0] + "Effect"].none);
				}
			}
			if(c[0].toLowerCase() == "hp") {
				post(character.name + "'s HP: " + character.hp.current + "/" + character.hp.max + ".",2);
			}
		}
		if(c.length == 2) {
			if(c[0] == "cast") {
				//verify ability and pools 
				qSpell = c[1];
			}			
			if(c[0] == "flee") {
				mobID = c[1];
				mobI = grid.mobIDs.indexOf(mobID);
				if(mobI >= 0) {
					if(Math.floor(Math.random()*100)+1 < y) {
						post(grid.mobs[mobI] + " flees!",2);
						command("despawn " + mobID);
					}
				}
			}
			if(c[0] == "despawn") {
				mobID = c[1];
				mobI = grid.mobIDs.indexOf(mobID);
				if(mobI >= 0) {						
					grid.mobs.splice(mobI, 1);
					grid.mobIDs.splice(mobI, 1);
					window[grid.id] = grid;									//create an update grid function
					loadGrid(window[grid.id]);
				}
			}
		}
	}
	save();
}

function startBreathing(c) {
	breathe = setInterval(function() {
		if(c.hp.current == 0) {
			clearInterval(breathe);
		} else {
			if(c.hp.current < c.hp.max) {
				tempNewHP = c.hp.current + c.hp.rate;
				if(tempNewHP >= c.hp.max) {
					c.hp.current = c.hp.max;
					post(character.name + " has fully recovered.",2);
				} else {
					c.hp.current = tempNewHP;
				}
			}
			if(c.energy.current < c.energy.max) {
				tempNewEnergy = c.energy.current + c.energy.rate;
				if(tempNewEnergy >= c.energy.max) {
					c.energy.current = c.energy.max;
					post(character.name + " has fully recovered their focus.",2);
				} else {
					c.energy.current = tempNewEnergy;
				}
			}
			if(c.mana.current < c.mana.max) {
				tempNewMana = c.mana.current + c.mana.rate;
				if(tempNewMana >= c.mana.max) {
					c.mana.current = c.mana.max;
					post(character.name + " has fully recovered their mana.",2);
				} else {
					c.mana.current = tempNewMana;
				}
			}
		}
	}, 5000);
}

function heal(c) {
	if(c.hp.current < c.hp.max) {
		tempNewHP = c.hp.current + healAMT;
		if(tempNewHP >= c.hp.max) {
			c.hp.current = c.hp.max;
			post(character.name + " has fully recovered.",2);
		} else {
			c.hp.current = tempNewHP;
		}
	}
	command("hp");
}
