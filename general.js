$("#commandLine").keypress(function (e) {
	if(e.which === 13 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		console.log($("#commandLine").val());
		command($("#commandLine").val());
		//clears command line
		$("#commandLine").val('');
	}
});

character = {
	name: "Evander",
}

function command(c) {
	console.log(c);
	c = c.split(" ");
	console.log(c);
	console.log(c[0].toLowerCase());
	if(c.length == 1) {
		console.log(c);
		if(c[0].toLowerCase() == "heal") {
			console.log(character.name);
			post(character.name + " heals themself!","positiveEnergy");
			console.log(c);
		}
	}

}

function post(a,b) {
	console.log(b);
	$('#txtScreen').append('<span class="' + b + '">' + a + '</span></br>');
	console.log(b);
	//this line moves scrollbar to bottom
	$("#txtScreen").change($('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight));
}
