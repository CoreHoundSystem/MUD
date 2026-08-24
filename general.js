//delete these
$(function() {
	post("Loading game version 0.1.0.",2);
	post("Game Loaded.",2);
	loadGrid(gridA4);
	startBreathing(character);
})


// modify these

character = {
	name: "Evander",
	hp: {
		current: 1,
		max: 97,
		rate: 5,
	},
}

healAMT = 15;

// modify above

//classes for postText
classes = [
	"normal",				//default
	"playerCommand",		//player commands
	"serverCommand",		//server responses to player commands
	"adminCommands",		//admin commands and server updates
	//spell schools (4-17)
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
	//quality (18-26)
	"common",				//
	"uncommon",				//
	"masterwork",			//
	"magic",				//
	"superior",				//
	"epic",					//
	"set",					//
	"artifact",				//
	"cursed",				//
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
	if(c.substring(0,c.indexOf(" ")).toLowerCase() == "say" || c.substring(0,c.indexOf(" ")).toLowerCase() == "get") {
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "say") {
			says = c.substring(c.indexOf(" "),c.length);
			console.log(says);
			post(character.name + " says: " + says,0);
		}
		if(c.substring(0,c.indexOf(" ")).toLowerCase() == "get") {
			gets = c.substring(c.indexOf(" ")+1,c.length);
			console.log(gets);
			if(grid.get.indexOf(gets) >= 0) {
				post(character.name + " picks up " + gets,0);
				grid.get.splice(grid.get.indexOf(gets), 1);
				trueGrid = window[grid.id];
				trueGrid.get.splice(trueGrid.get.indexOf(gets), 1);
				console.log(trueGrid);
				console.log(window[trueGrid]);
				loadGrid(window[trueGrid]);
			} else {
				post("There is no " + gets + " present.",2);
			}

		}
	} else {
		c = c.split(" ");
		if(c.length == 1) {
			console.log(c);
			if(c[0].toLowerCase() == "heal") {
				console.log(character.name);
				//conjuration
				post(character.name + " heals themself!",8);
				heal(character);	//adjust for target
				console.log(c);
			}
			//check if path
			console.log(paths.indexOf(c[0].toLowerCase()));
			if(paths.indexOf(c[0].toLowerCase()) >= 0) {
				path = c[0].substring(0,1).toUpperCase() + c[0].substring(1);
				console.log(path);
				if(grid.paths.indexOf(path) > -1) {
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
			
		}
	}
}

function startBreathing(c) {
	breathe = setInterval(function() {
		if(c.hp.current < c.hp.max) {
			tempNewHP = c.hp.current + c.hp.rate;
			if(tempNewHP >= c.hp.max) {
				c.hp.current = c.hp.max;
				post(character.name + " has fully recovered.",2);
			} else {
				c.hp.current = tempNewHP;
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
