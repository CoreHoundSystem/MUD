$(function() {
	
})

var characters = ["Steve","Percival","Shandryll"];

function loadGame(y) {
	postText("Loading game...",1);
	setTimeout(function() {
		postText("Game loaded.",1);
		//load stuff
		postText("Available Characters.",1);
		for(i=0;i<characters.length;i++) {
			console.log(characters[i]);
			postText(characters[i],1);
		}
	}, 3000);
}

function play(y) {
	console.log(y);
	y = y.split(" ");						
	//check if Y > 2 && check if y1 exists
	postText("Loading " + y[1] + "...",1);
	setTimeout(function() {
		postText(y[1] + " loaded.",1);
	}, 3000);
}

function grid(x) {
	
}

gridA4 = {
	name: "Breiðr Ormr - lower deck",
	map: "Vey'Keng",
	desc: "The hull of the Breiðr Ormr is broad and has multiple decks - this is the lowest deck. It is dark and humid with every breath adding to the suffocating melancholy of your shipmates.",
	paths: ["Up","Bow","Stern"],
	smell: {
		none: "The air is thick and heavy. The smell of body odor and filth chokes out all other scents except the occassional breeze of crisp ocean air that finds its way down from above.",
	},
	look: {
		none: "All around you are the crestfallen faces of fellow warriors.",
	},
	feel: {
		none: "Your clothes are stained with sweat so thick that the fabric has become rigid and coarse.",
	},
	listen: {
		none: "Despite being surrounded it is eerily silent here. All that can be heard are the waves slapping against the hull and the sound of footsteps from the decks above.",
	},
	taste: {
		none: "Your lips are salty with sweat.",
	},
	search: {},
}
/*
gridName {
  mapID: name of map the grid belongs to,
  desc: description of grid,
  paths: array of paths paired with gridName and detection methods!?

  smells: array of things that can be smelled and their scents
  look: array of things that can be looked at more closely and their descriptions
  feel: array of things with a tactile quality and their descriptions
  hear: array of things that can heard/listened to and their descriptions
  taste: array of things that can be tasted and their descriptions

  mobs: list of mobs
  loot: list of loot ('take' command)

  events: array of events paired with their triggers/frequencies
*/
