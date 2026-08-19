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
			postText(characters[i]);
		}
	}, 3000);
}

function play(y) {
	console.log(y);
	y = y.split(" ");						
	//check if Y > 2 && check if y1 exists
	postText("Loading " + y[1] + "...",1);
	setTimeout(function() {
		postText(y[1] + " loaded.");
	}, 3000);
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
