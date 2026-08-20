$(function() {
	$('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight);
})

$("#txtScreen").change($('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight););

var characters = ["Steve","Percival","Shandryll"];
var grid = {};
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
		loadGrid(gridA4);
	}, 3000);
}

function loadGrid(x) {
	grid = x;
	if(Array.isArray(x)) {
		grid = x[1];
		console.log(x[1]);
	}
	$('#txtScreen').append('<span style="color: yellow">' + grid.name + '</span></br>');
	$('#txtScreen').append('</br>');
	$('#txtScreen').append('<span style="color: white">' + grid.desc + '</span></br>');
	$('#txtScreen').append('</br>');
	$('#txtScreen').append('<span style="color: white">Your available paths are:</span></br>');
	for(i=0;i<grid.paths.length;i++) {
		$('#txtScreen').append('<span style="color: white;margin-left: 25px">' + grid.paths[i] + '</span></br>');
	}
	$('#txtScreen').append('</br>');
	for(i=0;i<grid.mobs.length;i++) {
		$('#txtScreen').append('<span style="color: white;margin-left: 25px">' + grid.mobs[i] + '</span></br>');
	}
	for(i=0;i<grid.take.length;i++) {
		$('#txtScreen').append('<span style="color: white;margin-left: 25px">' + grid.take[i] + '</span></br>');
	}
	for(i=0;i<grid.eList.length;i++) {
		//
		console.log(grid.eList[i]);
		console.log(grid.eType);
		console.log(grid.eType[grid.eList[i]]);
		y = grid.eType[grid.eList[i]]
		setTimeout(function() {
			$('#txtScreen').append('<span style="color: '+ y.color + '">' + y.post + '</span></br>');
		}, y.frequency);
	}
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
		up: "The stairs leading to the deck above are the cleanest part of this deck. The deck above seems packed with barrels and crates."
	},
	feel: {
		none: "Your clothes are stained with sweat so thick that the fabric has become rigid and coarse.",
	},
	listen: {
		none: "Despite being surrounded it is eerily silent here. All that can be heard are the waves slapping against the hull and the sound of footsteps from the decks above.",
		up: "The sounds of sailors walking about can be heard.",
	},
	taste: {
		none: "Your lips are salty with sweat.",
	},
	search: {
		none: "The floor is covered in sea water and filth. There is nothing of value here.",
	},
	open: {
		none: "What would you like to open?",
	},
	sit: {
		none: "You return to your makeshift bench.",
	},
	lay: {
		none: "There is no room to lay down here.",
	},
	climb: {
		none: "You could climb up the stairs to the deck above when you are ready.",
	},
	mobs: [
		"Bilge Rat",
		"Bilge Rat"
	],
	take: [
		"Soiled scrap of cloth",
	],
	eList: [
		"footsteps",
		"breeze"
	],
	eType: {
		footsteps: {
			post: "The sound of footsteps can be heard from the deck above.",
			freq: 3000,
			color: "white",
		},
		breeze: {
			post: "A much needed breeze brings crisp ocean air into the hold.",
			freq: 5000,
			color: "white",
		},
	}
}
