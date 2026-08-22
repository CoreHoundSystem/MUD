$("#commandLine").keypress(function (e) {
	if(e.which === 13 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		console.log($("#commandLine").val());
		command($("#commandLine").val());
		//clears command line
		$("#commandLine").val('');
	}
});

char = {
	name: "Evander",
}

function command(c) {
	console.log(c);
	c = c.split(" ");
	console.log(c);
	console.log(c[0].lowerCase);
	if(c.length == 1) {
		if(c[0].lowerCase == "heal") {
			post(char.name + " heals themself!","positiveEnergy");
		}
	}

}

function post(a,b) {
	$('#txtScreen').append('<span class="' + b + '">' + a + '</span></br>');
	//this line moves scrollbar to bottom
	$("#txtScreen").change($('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight));
}
