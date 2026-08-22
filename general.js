$("#commandLine").keypress(function (e) {
	if(e.which === 13 && !e.shiftKey) { //includes option to ignore if SHIFT is held
		e.preventDefault();
		console.log($("#commandLine").val());
		command($("#commandLine").val());
		/*
		t = $("#commandLine").val();
		console.log(t.substring(0,1));
		if(t.substring(0,1) != "/") {
			postText(t,1);
			
		} else {
			//
			command(t);
		}
		*/
		
		//clears command line
		$("#commandLine").val('');
	}
});

function command(c) {
	console.log(c);
	c = c.split(" ");
	console.log(c);
	if(c.length == 1) {
		if(c[0].lowerCase == "heal") {
			post(char.name + " heals themself!","positiveEnergy");
		}
	}

}

function postText(a,b) {
	$('#txtScreen').append('<span class="' + b + '">' + a + '</span></br>');
	//this line moves scrollbar to bottom
	$("#txtScreen").change($('#txtScreen').scrollTop($('#txtScreen')[0].scrollHeight));
}
