//delete these
$(function() {
	post("Loading game version 0.1.0.",2);
	post("Game Loaded.",2);
	loadGrid(gridA4);
})


// modify these

character = {
	name: "Evander",
}

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

$("#commandLine").keypress(function (e) {
	if(e.which === 13 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		console.log($("#commandLine").val());
		command($("#commandLine").val());
		//clears command line
		$("#commandLine").val('');
	}
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
	if(c.substring(0,c.indexOf(" ")).toLowerCase() == "say") {
		says = c.substring(c.indexOf(" "),c.length);
		console.log(says);
		post(character.name + " says: " + says,0);
	} else {
		c = c.split(" ");
		if(c.length == 1) {
			console.log(c);
			if(c[0].toLowerCase() == "heal") {
				console.log(character.name);
				//conjuration
				post(character.name + " heals themself!",8);
				console.log(c);
			}
			if(c[0].toLowerCase() == "up" || c[0].toLowerCase() == "u") {
				if(grid.paths.indexOf("Up") > -1) {
					loadGrid(window[grid.pathIDs[grid.paths.indexOf("Up")]]);
				}
			}
			if(c[0].toLowerCase() == "down" || c[0].toLowerCase() == "d") {
				if(grid.paths.indexOf("Down") > -1) {
					loadGrid(window[grid.pathIDs[grid.paths.indexOf("Down")]]);
				}
			}
		}
		if(c.length == 2) {
			
		}
	}
}
